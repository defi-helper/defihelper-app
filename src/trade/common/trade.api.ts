import axios from 'axios'

const ACCESS_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIyOWJlYjY2Mi05N2M1LTQ3OTUtOTUzNS00YWUyMWRhY2E0YjciLCJLZXlUeXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU3ODA5MzI0LCJpc3MiOiJib29raXRlLmF1dGguc2VydmljZSJ9.gsIhvd36NZXblJ0zOWvhzNCNWPH3ITcMv70qLWnwPERqo0oGow_ydhBAw29iF3xZqoDQZ767cCe8prBknPcQI4h8bXlmwViM8vaTv1Q7TMnYsw9KORbiMI9BxHyVIaWzl_YPlWKGtxOQM2d2J0LT6KWsPa4ghh1Iv5y_VUWRuXBiXXhZLn67Nzv8fXlrxm-tFVMlsZDKLjh8kMc7o4cvRFGZclSd4ImrUtC3FuQAhaJlK3Wf3Gi0Coyry0BSIaVoLMC8ziB2gQ50uYF-I8DwocqzrbIQS9-cXaYemmLH9kBiuHlYisJ8FxVF_VI_ZA1CdK-JFUctSdb9dbYrDa3mJQ'

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
      .get<any>(
        `open/chart/pair/history?symbol=${address}-USD&resolution=60&from=1656727091&to=1657807091&countback=300`
      )
      .then(({ data }) => data),
}
