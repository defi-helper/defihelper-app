export const paths = {
  main: '/',

  protocols: {
    list: '/protocols',
    detail: (id = ':protocolId') => `/protocols/${id}` as const,
    create: '/protocols/create',
    update: (id = ':protocolId') => `/protocols/update/${id}` as const,
  },

  staking: {
    create: (protocolId = ':protocolId') =>
      `/protocols/${protocolId}/staking/create` as const,
    update: (protocolId = ':protocolId', stakingId = ':stakingId') =>
      `/protocols/${protocolId}/staking/${stakingId}` as const,
  },

  dashboard: '/dashboard',

  proposals: {
    list: '/proposals',
    detail: (id = ':proposalId') => `/proposals/${id}` as const,
    create: '/proposals/create',
    update: (id = ':proposalId') => `/proposals/update/${id}` as const,
  },

  contacts: {
    list: '/contacts',
    confirmEmail: (code = ':confirmationCode') =>
      `/confirm-email/${code}` as const,
  },

  userEventSubscriptions: {
    list: '/user-event-subscriptions',
  },

  billing: '/billing',
} as const
