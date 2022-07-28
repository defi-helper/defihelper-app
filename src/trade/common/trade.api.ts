import axios from 'axios'

import { config } from '~/config'

const ACCESS_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIyOWJlYjY2Mi05N2M1LTQ3OTUtOTUzNS00YWUyMWRhY2E0YjciLCJLZXlUeXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5MDM5MzkyLCJpc3MiOiJib29raXRlLmF1dGguc2VydmljZSJ9.DshwgwW5a8QOiZ062TsMIamhbyfyKBmNpWWrlmr2trfvYxOXortz6spy8V3PWHPCBerAXpKSTcEjfphJmeHM2KTKn10pXOGaUt_mcZ5xM2TUUCGeMnSOw0ZbdlFEEeojlH9e0U22e7EF1KMA2bpvRKnZCrM4SmC2oF_PrUkE2-ImiI_-Z2y3sAPL4_efjlrjCkPrFd4K9ST7IPAu63-k9F4PYyCUdlsJbvM2bDwxTGVzM66xdO0pZpkehS-bjgJ8fkboYDU8ULUrYlqb3yKmla2nCE-3SXq8_NI5j0d4uITP_yZ9emi7xFPG4972VdW63x5E9Eqyi-riAcwxyq-ZKQ'

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
