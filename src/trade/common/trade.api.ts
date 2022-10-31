import axios, { AxiosRequestConfig } from 'axios'

import {
  getAPIClient,
  TradeAuthMutation,
  TradeAuthMutationVariables,
  TradeCancelOrderMutation,
  TradeCancelOrderMutationVariables,
  TradeCreateOrderMutation,
  TradeCreateOrderMutationVariables,
  TradeOrderListQuery,
  TradeOrderListQueryVariables,
  TradeUpdateOrderMutation,
  TradeUpdateOrderMutationVariables,
} from '~/api'
import { dateUtils } from '~/common/date-utils'
import { config } from '~/config'
import { TRADE_AUTH } from './graphql/trade-auth.graphql'
import { TRADE_CANCEL_ORDER } from './graphql/trade-cancel-order.graphql'
import { TRADE_CREATE_ORDER } from './graphql/trade-create-order.graphql'
import { TRADE_ORDER_LIST } from './graphql/trade-order-list.graphql'
import { TRADE_UPDATE_ORDER } from './graphql/trade-update-order.graphql'
import { pairMock } from './trade-dev.mock'

const apiV1 = axios.create({
  baseURL: 'https://whattofarm.io/ext-api/v1',
})

export type Exchange = {
  Icon: string
  Name: string
  Address?: string
}

export type Pool = {
  Address: string
  Name: string
  DexName: string
  Icon: string
  NetworkName: string
  CurrencySymbol: string
  PairCount: number
  Liquidity: number
  Routers: {
    Address: string
    Count: number
  }[]
}

export type Token = {
  address: string
  name: string
  network: {
    currencySymbol: string
    name: string
  }
  slug: string
  symbol: string
  totalSupply: number
  usdPrice: number
}

export type Pair = {
  aprDay: number
  aprYear: number
  hidden: boolean
  hiddenCause: string
  links: string[]
  liquidity: number
  liquidityCount: {
    h1: number
    h24: number
    h4: number
    m5: number
  }
  marketCap: number
  pairInfo: {
    address: string
    createdAt: string
    defiType: string
    description: string
    icon: string
    inv: boolean
    lpToken: {
      address: string
      name: string
      network: {
        currencySymbol: string
        name: string
      }
      slug: string
      symbol: string
      totalSupply: number
      usdPrice: number
    }
    poolAddress: string
    poolName: string
    reserves: number[]
    ticker: string
    tokens: Token[]
  }
  price: number
  pricePercentCount: {
    h1: number
    h24: number
    h4: number
    m5: number
  }
  tags: null
  ts: string
  txsBuysCount: {
    h1: number
    h24: number
    h4: number
    m5: number
  }
  txsCount: {
    h1: number
    h24: number
    h4: number
    m5: number
  }
  txsSellsCount: {
    h1: number
    h24: number
    h4: number
    m5: number
  }
  usdPrice: number
  volumeCount: {
    h1: number
    h24: number
    h4: number
    m5: number
  }
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
      .then(({ data }) => ({
        data: config.IS_DEV
          ? [
              {
                Icon: 'https://whattofarm.io/assets/dex/0x800b052609c355cA8103E06F022aA30647eAd60a',
                Name: 'Uniswap dev',
                Address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
              },
              ...data.data,
            ]
          : data.data,
        message: data.message,
      })),

  poolInfo: (networks: string[]) =>
    apiV1
      .get<Response<Pool[]>>('pool-info', {
        params: {
          networks: networks.join(','),
        },
      })
      .then(({ data }) => data),

  price: (request: string[]) =>
    apiV1
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .get<Response<any>>('get-actual-price', {
        params: {
          request: request.join(','),
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
      .post<Response<{ list: Pair[] }>>(
        'pair-stat?page=1&size=100&minLiquidity=10000&sortField=vol&sortDirection=desc',
        payload,
        {
          params: {
            network: network.join(','),
            pool: pool.join(','),
          },
        }
      )
      .then(({ data }) => ({
        ...data,
        data: {
          ...data.data,
          list: config.IS_DEV ? [pairMock, ...data.data.list] : data.data.list,
        },
      })),

  history: (
    address: string,
    from: string,
    to: string,
    countback: number,
    resolution = '60'
  ) =>
    apiV1
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .get<any>(
        `https://whattofarm.io/api/v2/open/chart/pair/history?symbol=${address}-USD`,
        {
          params: {
            resolution,
            from,
            to,
            countback,
          },
        }
      )
      .then(({ data }) => data),

  sendForm: <T extends Record<string, unknown>>(
    listId: string,
    formValues: T
  ) => {
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

  createOrder: (input: TradeCreateOrderMutationVariables['input']) =>
    getAPIClient()
      .request<
        TradeCreateOrderMutation,
        unknown,
        TradeCreateOrderMutationVariables
      >({
        query: TRADE_CREATE_ORDER.loc?.source.body ?? '',
        variables: {
          input,
        },
      })
      .then(({ data }) => data?.smartTradeSwapOrderCreate),

  cancelOrder: (id: TradeCancelOrderMutationVariables['id']) =>
    getAPIClient()
      .request<
        TradeCancelOrderMutation,
        unknown,
        TradeCancelOrderMutationVariables
      >({
        query: TRADE_CANCEL_ORDER.loc?.source.body ?? '',
        variables: {
          id,
        },
      })
      .then(({ data }) => data?.smartTradeCancel),

  updateOrder: (variables: TradeUpdateOrderMutationVariables) =>
    getAPIClient()
      .request<
        TradeUpdateOrderMutation,
        unknown,
        TradeUpdateOrderMutationVariables
      >({
        query: TRADE_UPDATE_ORDER.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.smartTradeSwapOrderUpdate),

  fetchOrders: (variables: TradeOrderListQueryVariables) =>
    getAPIClient()
      .request<TradeOrderListQuery, unknown, TradeOrderListQueryVariables>({
        query: TRADE_ORDER_LIST.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => ({
        list: data?.smartTradeOrders.list ?? [],
        pagination: data?.smartTradeOrders.pagination.count ?? 0,
      })),
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
