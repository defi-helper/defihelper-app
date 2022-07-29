import axios from 'axios'

import { config } from '~/config'

const ACCESS_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIyOWJlYjY2Mi05N2M1LTQ3OTUtOTUzNS00YWUyMWRhY2E0YjciLCJLZXlUeXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5MTgxOTI0LCJpc3MiOiJib29raXRlLmF1dGguc2VydmljZSJ9.rXAzayGUcE8pIDfO_JLD1YsgcHj1SxaaKtiesDq5-sQuBZCT6Yvz7Xhxsv2VseMrA0AlzCgaQrybfjEkp-w-woEmaL6pOAgUGHqKMMy8zUYdgfL6qh2i2n_wCtimEKxVufHuM5zhiPEqdk2n4qyG54-_8vneUqwQuIfKleWAsn2pk_ujWNg1iuZ-lGxWDJUFBZSgGnwj1ixFlzU1qsb4I4MbPdMb1zptyQw5a_vawXVGQEVoFcQCd_dVq2rykITeKE0SB9-R4UacBakzGXhuVEW_JtZkVsXhEi1PbkqFNB-RtNGfWWQIkoI9_TYsTZc21byzQx-I8743VDGGQj1MNA'

const apiV1 = axios.create({
  baseURL: 'https://whattofarm.io/ext-api/v1',
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
})

const apiV2 = axios.create({
  baseURL: 'https://whattofarm.io/api/v2/',
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
})

type Exchange = {
  Icon: string
  Name: string
}

type Response<T> = { code: 200 | 500 | 405; data?: T; message?: string }

export const tradeApi = {
  exchanges: (networks: string[]) =>
    apiV1
      .get<Response<Exchange[]>>('dex-info', {
        params: {
          networks,
        },
      })
      .then(({ data }) => data),

  pairs: (
    network: string[],
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
            network,
          },
        }
      )
      .then(({ data }) => data),

  history: (address: string) =>
    apiV2
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .get<any>(
        `open/chart/pair/history?symbol=${address}-USD&resolution=60&from=1656727091&to=1657807091&countback=300`
      )
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
}
