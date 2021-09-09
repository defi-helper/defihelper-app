export type GovernancePresetVariables = {
  [key: string]: {
    type: string
    default: string
  }
}

export type GovernancePresetInput = {
  variable: boolean
  type: string
  value: string
}

export type GovernancePresetAction = {
  contract: string
  method: string
  input: GovernancePresetInput[]
}

export type GovernancePreset = {
  title: string
  description: string
  variables: GovernancePresetVariables
  actions: GovernancePresetAction[]
}

export const governancePresets: GovernancePreset[] = [
  {
    title: 'Issuer: burn USDap',
    description:
      'Transfer USDap token from Treasury to Issuer contract and call rebalance',
    variables: {
      amount: {
        type: 'uint256',
        default: '1000000000000000000',
      },
    },
    actions: [
      {
        contract: 'Treasury',
        method: 'transfer',
        input: [
          {
            variable: false,
            type: 'address',
            value: '',
          },
          {
            variable: true,
            type: 'address',
            value: '',
          },
          {
            variable: true,
            type: 'uint256',
            value: 'amount',
          },
        ],
      },
      {
        contract: 'Issuer',
        method: 'rebalance',
        input: [],
      },
    ],
  },
]
