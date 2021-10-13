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

  portfolio: '/portfolio',

  roadmap: {
    list: '/roadmap',
    detail: (id = ':proposalId') => `/roadmap/${id}` as const,
  },

  settings: {
    list: '/settings',
    confirmEmail: (code = ':confirmationCode') =>
      `/settings/confirm-email/${code}` as const,
  },

  userEventSubscriptions: {
    list: '/user-event-subscriptions',
  },

  governance: {
    list: '/governance',
    detail: (governanceId = ':governanceId') =>
      `/governance/${governanceId}` as const,
    create: '/governance/create',
  },

  automations: {
    list: '/automations',
    create: '/automations/create',
    update: (automationId = ':automationId') =>
      `/automations/update/${automationId}` as const,
    history: (automationId = ':automationId') =>
      `/automations/history/${automationId}` as const,
  },
} as const
