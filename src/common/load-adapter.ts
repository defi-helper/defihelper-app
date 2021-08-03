/* eslint-disable @typescript-eslint/ban-ts-comment */

const ERROR = 'AdapterFn not loaded'

const moduleExports = {
  exports: new Error(ERROR),
}

type Action = {
  can: () => Promise<boolean | Error>
  send: () => Promise<void>
}

type ActionWithAmount = {
  can: (amount: string) => Promise<boolean | Error>
  send: (amount: string) => Promise<void>
}

type Token = {
  [key: string]: {
    balance: string
    usd: string
  }
}

export type AdapterWallet = {
  staked: Token
  earned: Token
  tokens: Token
  metrics: {
    staking: string
    stakingUSD: string
    earned: string
    earnedUSD: string
  }
}

export type AdapterActions = {
  stake: ActionWithAmount
  unstake: ActionWithAmount
  claim: Action
  exit: Action
}

export type Adapter = {
  staking: {
    token: string
    decimals: number
  }
  reward: {
    token: string
    decimals: number
  }
  metrics: {
    tvl: string
    aprDay: string
    aprWeek: string
    aprMonth: string
    aprYear: string
  }
  wallet: (walletAddress: string) => Promise<AdapterWallet>
  actions: (walletAddress: string) => Promise<AdapterActions>
}

export type AdapterFn = (
  provider: unknown,
  address: unknown,
  options?: unknown
) => Promise<Adapter>

export const loadAdapter = (
  url: string,
  adapter?: string
): Promise<AdapterFn> => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    window.module = moduleExports

    const script = document.createElement('script')

    script.src = url

    const handler = () => {
      if (!adapter && !(window.module.exports instanceof Error)) {
        return resolve(window.module.exports)
      }

      if (!adapter) return reject(moduleExports.exports)

      const currentAdapter = window.module.exports[adapter]

      if (!currentAdapter) reject(moduleExports.exports)
      else {
        script.removeEventListener('load', handler)
        script.remove()

        // @ts-ignore
        window.module = moduleExports

        resolve(currentAdapter)
      }
    }

    script.addEventListener('load', handler)

    script.addEventListener('error', handler)

    document.body.appendChild(script)
  })
}
