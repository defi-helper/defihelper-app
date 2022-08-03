import axios, { AxiosRequestConfig } from 'axios'

import {
  getAPIClient,
  TradeAuthMutation,
  TradeAuthMutationVariables,
} from '~/api'
import { dateUtils } from '~/common/date-utils'
import { config } from '~/config'
import { TRADE_AUTH } from './graphql/trade-auth.graphql'

const apiV1 = axios.create({
  baseURL: 'https://whattofarm.io/ext-api/v1',
})

type Exchange = {
  Icon: string
  Name: string
}

type Response<T> = { code: 200 | 500 | 405; data: T; message?: string }

export const tradeApi = {
  exchanges: (networks: string[]) =>
    apiV1
      .get<Response<Exchange[]>>('dex-info', {
        params: {
          networks: networks.join(','),
        },
      })
      .then(({ data }) => data),

  pairs: (
    network: string[],
    pool: string[],
    payload: {
      excludedPairAddresses: string[]
      pairAddresses: string[]
    } = {
      excludedPairAddresses: [],
      pairAddresses: [],
    }
  ) =>
    apiV1
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .post<Response<{ list: any[] }>>(
        'pair-stat?page=1&size=100&minLiquidity=10000&sortField=liquidity&sortDirection=desc',
        payload,
        {
          params: {
            network: network.join(','),
            pool: pool.join(','),
          },
        }
      )
      .then(({ data }) => data),

  history: (address: string, from: string, to: string, resolution = '60') =>
    apiV1
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .get<
        Response<
          {
            Address: string
            ClosePrice0: number
            ClosePrice1: number
            CloseUsdPrice0: number
            CloseUsdPrice1: number
            MaxPrice0: number
            MaxPrice1: number
            MaxUsdPrice0: number
            MaxUsdPrice1: number
            MinPrice0: number
            MinPrice1: number
            MinUsdPrice0: number
            MinUsdPrice1: number
            OpenPrice0: number
            OpenPrice1: number
            OpenUsdPrice0: number
            OpenUsdPrice1: number
            SwapCount: number
            TS: string
            Volume0: number
            Volume1: number
          }[]
        >
      >(`/pair-bin?symbol=${address}`, {
        params: {
          resolution,
          from,
          to,
        },
      })
      .then(({ data }) => data),

  sendForm: <T>(listId: string, formValues: T) => {
    const query = Object.entries(formValues)
      .flatMap(([key, value]) => {
        return `fields[${key}]=${value}`
      })
      .join('&')

    return fetch(
      `${config.UNISENDER_API}&list_ids=${listId}&${query}&double_optin=3`,
      {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'content-type': 'text/plain',
        },
      }
    )
  },

  loginWhattofarm: () =>
    getAPIClient()
      .request<TradeAuthMutation, unknown, TradeAuthMutationVariables>({
        query: TRADE_AUTH.loc?.source.body ?? '',
      })
      .then(({ data }) => data?.tradingAuth),
}

const authRequestInterceptor = async (axiosConfig: AxiosRequestConfig) => {
  const whattofarm = JSON.parse(localStorage.getItem('whattofarm') ?? '{}')

  if (
    whattofarm?.accessToken &&
    whattofarm.tokenExpired &&
    !dateUtils.isAfter(whattofarm.tokenExpired)
  ) {
    Object.assign(axiosConfig.headers, {
      Authorization: `Bearer ${whattofarm?.accessToken}`,
    })
  }

  return axiosConfig
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authResponseInterceptor = async (error: any) => {
  const errorConfig = error?.config

  if (error?.response?.status !== 200 && !errorConfig?.sent) {
    errorConfig.sent = true

    const result = await tradeApi.loginWhattofarm()

    if (result?.accessToken) {
      errorConfig.headers = {
        ...errorConfig.headers,
        authorization: `Bearer ${result?.accessToken}`,
      }
    }

    if (result) {
      localStorage.setItem('whattofarm', JSON.stringify(result))
    }

    return axios(errorConfig)
  }

  return Promise.reject(error)
}

apiV1.interceptors.request.use(authRequestInterceptor, (r) => Promise.reject(r))
apiV1.interceptors.response.use((response) => response, authResponseInterceptor)
