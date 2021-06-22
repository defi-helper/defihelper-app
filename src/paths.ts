export const paths = {
  main: '/',

  protocols: {
    list: '/protocols',
    detail: (id = ':protocolId') => `/protocols/${id}`
  },

  staking: {
    list: '/staking',
    detail: (id = ':stakingId') => `/staking/${id}`
  }
}
