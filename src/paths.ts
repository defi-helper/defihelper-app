export const paths = {
  main: '/',

  protocols: {
    list: '/protocols',
    detail: (id = ':protocolId') => `/protocols/${id}`,
    create: '/protocols/create',
    update: (id = ':protocolId') => `/protocols/update/${id}`
  },

  staking: {
    create: (protocolId = ':protocolId') =>
      `/protocols/${protocolId}/staking/create`,
    update: (protocolId = ':protocolId', stakingId = ':stakingId') =>
      `/protocols/${protocolId}/staking/${stakingId}`
  }
}
