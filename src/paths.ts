export const paths = {
  main: '/',

  protocols: {
    list: '/protocols',
    detail: (id = ':protocolId') => `/protocols/${id}`,
    create: '/protocols/create',
    update: (id = ':protocolId') => `/protocols/update/${id}`
  },

  staking: {
    list: '/staking',
    detail: (id = ':stakingId') => `/staking/${id}`
  }
}
