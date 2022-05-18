export const paths = {
  main: '/',

  protocols: {
    list: '/protocols',
    detail: (id = ':protocolId') => `/protocols/${id}` as const,
    detailReadonly: (id = ':protocolId') =>
      `/protocols/readonly/${id}` as const,
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

  governance: {
    list: '/governance',
    detail: (governanceId = ':governanceId') =>
      `/governance/${governanceId}` as const,
    create: '/governance/create',
  },

  automations: {
    list: '/automations',
    history: (automationId = ':automationId') =>
      `/automations/history/${automationId}` as const,
  },

  users: '/users',

  governanceMultisig: '/governance-multisig',

  referral: {
    list: '/referral',
    transactions: '/referral/transactions',
    calculator: '/referral/calculator',
  },

  vesting: '/vesting',

  monitoring: '/monitoring',

  buyLp: '/buy-liquidity',
} as const
