import axios from 'axios'

const ACCESS_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIyOWJlYjY2Mi05N2M1LTQ3OTUtOTUzNS00YWUyMWRhY2E0YjciLCJLZXlUeXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU3NzQ5MTAwLCJpc3MiOiJib29raXRlLmF1dGguc2VydmljZSJ9.RjS-R9xewiy9yilX9sWiP4Gj5qZG1wr7qMaCMCnixb-B4944zx5epSmp6RuNhYag6ZzZYFOmzH66XJM8-UUumgqqjbE5Qu9TLoslA7lyL9N8PNm19g1qBGr9ZYrIjmxByy6yfAZxpJSj4LZsAl5Aim4eaAudBKNRerqhPvVa8dq1-N8ZZcSi9ddyAD4SNb-1YOy8Y-FQxk3jnPdQQiMA-gxiQ-WudZpAnYPo0thlh5xNRUxysBKHczqp1x80hQEZ6DZEtO4mywmWyva4ktN16qRxJ2GRPwSvcinVQSJGfktfxGVqx9sL6NSNYq0pmQEtNGpXCX3Zc_YW3e-ewHvfyA'

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
      .get(
        `open/chart/pair/history?symbol=${address}-USD&resolution=1&from=1656547469&to=1657627469&countback=18000`
      )
      .then(({ data }) => data),
}
