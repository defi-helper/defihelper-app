import axios from 'axios'

const ACCESS_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIyOWJlYjY2Mi05N2M1LTQ3OTUtOTUzNS00YWUyMWRhY2E0YjciLCJLZXlUeXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU3ODEyNjQwLCJpc3MiOiJib29raXRlLmF1dGguc2VydmljZSJ9.Qgcgf_trNySofK5nE8CQvhcWuZe41xukcrbFlhGiyBU2sSYolBpOEQrWuqEZHHel_kQtOEaLHKDBBvITPJHi9Cp78sKmO3ued-t1vyzNWo1n_upiRjdB1c3xlOpZp_ZExn0B_4SaZegkjeEy_bmytf1WlndqgeDcgnJ4y9i7sFUyx3GpjkmgYNYmDJsNtDjdYGiDo_6RLeYc0LnthSl_prpdeZ35zGW1MUYFzxuYfgqTik-YNmNi3MOdOwks1AaajgDvsmbzhNTauvof3XpJnNRoEB8jvfYsyati7RqQrCJuAQJ9vHgDx-NHzC7nYpSDOF5EhE1iockSfWcpbR8pNg'

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .post<Response<{ list: any[] }>>(
        'pair-stat?network=eth&page=1&size=100&minLiquidity=10000&sortField=liquidity&sortDirection=desc',
        payload
      )
      .then(({ data }) => data),

  history: (address: string) =>
    apiV2
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .get<any>(
        `open/chart/pair/history?symbol=${address}-USD&resolution=60&from=1656727091&to=1657807091&countback=300`
      )
      .then(({ data }) => data),
}
