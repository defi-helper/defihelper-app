const ACCESS_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIyOWJlYjY2Mi05N2M1LTQ3OTUtOTUzNS00YWUyMWRhY2E0YjciLCJLZXlUeXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU3NjQ4MjUwLCJpc3MiOiJib29raXRlLmF1dGguc2VydmljZSJ9.ntpZ4mNSSkp8HBSYS0OSN-0pzi6qnH_OAOyhj_UdNIZyqRWmFkLODtYtick2S0EahqrfaMBZpGggZdt0ZE7usMuunKJN0Ta8OzQYT-uL3bDM09n2ABewB2p8ERRRwKFb9MUK9BMAPu1w8tyN-pLrRVYI9pncKEqE8BbxX7Foz-y3Puyzl6yPEuNTo8xyfhkmswJ6_lHzYJBUEQO2_572BRw0bpUqsbQ1bZePivykxvJfVJJWTRz6wzZZnuqISuXKtWohh3D1oCZ46vhoNb_fr7OJPwrDPvbkTZoRK7UhJQOEOyNjozWykDgiPAe5A5qy9EqqOgJwSuhQnPx3x9G8Aw'

const makeFetch = (url: string) => async (path: string) => {
  const response = await fetch(`${url}${path}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  })

  return response.json()
}

const v1 = makeFetch('https://whattofarm.io/ext-api/v1/')

const v2 = makeFetch('https://whattofarm.io/api/v2/')

export const tradeApi = {
  exchanges: () => v1('dex-info?networks=eth'),

  pairs: () =>
    v1(
      'pair-stat?network=eth&page=1&size=100&minLiquidity=10000&sortField=liquidity&sortDirection=desc'
    ),

  history: () =>
    v2(
      'open/chart/pair/history?symbol=0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE-USD&resolution=1&from=1656547469&to=1657627469&countback=18000'
    ),
}
