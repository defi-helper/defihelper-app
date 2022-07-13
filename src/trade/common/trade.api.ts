import axios from 'axios'

const ACCESS_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIyOWJlYjY2Mi05N2M1LTQ3OTUtOTUzNS00YWUyMWRhY2E0YjciLCJLZXlUeXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU3NzI4MDk2LCJpc3MiOiJib29raXRlLmF1dGguc2VydmljZSJ9.tvfGJmP_z5cnHsgD5ZTQABd_YyDGYGBJtkqItPRwmD168kkbaQ2R6UV0kiA_6GGQ4l578jguE9PF4hE_dZa-2PW4UkOe4ha1mX9CTWed-8n9ZIFaQkrBKjH5srnIiZriFThn4AhQeDv0MwCbgHBuakbzT9kH-lRPGEqoyT-W2BTzwfm-LGiP7WUfjGe8U0esgTrB3UqDZK7TxtntXvu2_UNEcrUWSnm0EuaV2NCZlLPFV8gpdB5kF5UsVe2qp0W2FE0h_1XdSB0j823Hku7j69RZCYfzm-ai25VxkCxt2fPFqvh-fl0cb9KNSuyyrp6DtaEZCxSuRxiBueu_7e6ghQ'

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
  DexAddress: string
  Name: string
}

type Response<T> = { code: 200 | 500 | 405; data?: T; message?: string }

export const tradeApi = {
  exchanges: () =>
    apiV1
      .get<Response<Exchange[]>>('dex-info?networks=eth')
      .then(({ data }) => data),

  pairs: (
    payload: {
      excludedPairAddresses: string[]
      pairAddresses: string[]
    } = {
      excludedPairAddresses: [],
      pairAddresses: [],
    }
  ) =>
    apiV1
      .post<Response<{ list: any[] }>>(
        'pair-stat?network=eth&page=1&size=100&minLiquidity=10000&sortField=liquidity&sortDirection=desc',
        payload
      )
      .then(({ data }) => data),

  history: () =>
    apiV2
      .get(
        'open/chart/pair/history?symbol=0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE-USD&resolution=1&from=1656547469&to=1657627469&countback=18000'
      )
      .then(({ data }) => data),
}
