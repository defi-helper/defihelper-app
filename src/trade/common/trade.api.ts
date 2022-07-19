import axios from 'axios'

const ACCESS_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIyOWJlYjY2Mi05N2M1LTQ3OTUtOTUzNS00YWUyMWRhY2E0YjciLCJLZXlUeXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU3ODE1MDkwLCJpc3MiOiJib29raXRlLmF1dGguc2VydmljZSJ9.Jam_3Z9T4lu12Yg5_5Egwc6ak0mTKyH7QK3ZbfbRJiGAmb317--L0edvgoNtxDLDB92nTnwhLVPenNf7RzfckJW6XkDnLOe_jENW3U8BXEESkIL-IDjVrUiZyZEmKCh0mUvSJ9e5GAbuixRGGZPXFrFM2yECQln86rGMbczSigjgnXLLzFGBdb4VM62zxuSNZo4Unul19Qf8ByN5oo0syGLkqr2SM2eTHZK3Y2lVlvWpx_0TOHVtx0Z3L20zX4rDhU8yBcXpLiqwkIxfeVFHOSb_rh87jeEGcYvh5CAOfgv_NLB0vuV5yf9Yr6RygTwi99G2PB7aGb3BaUcRxK6Ygw'

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
