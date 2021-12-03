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

export type AutomatesStepInfo = {
  description: string
  inputs?: { placeholder: string; value: string }[]
}

export type AutomatesStep = {
  can: (...args: unknown[]) => Promise<boolean>
  info: () => Promise<AutomatesStepInfo>
  name: string
  send: (
    ...args: unknown[]
  ) => Promise<{ tx: { wait: () => Promise<unknown> } }>
}

export type AutomatesType = {
  contract: string
  deposit: AutomatesStep[]
  refund: AutomatesStep[]
  migrate: AutomatesStep[]
}

export type Adapters = {
  staking: AdapterFn
  swopfiStaking: AdapterFn
  automates: Record<
    string,
    (signer: unknown, contractAddress: unknown) => Promise<AutomatesType>
  >
}

export function loadAdapter(url: string): Promise<Adapters> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    window.module = moduleExports

    const script = document.createElement('script')

    script.src = url

    const handler = () => {
      if (!(window.module.exports instanceof Error)) {
        script.removeEventListener('load', handler)
        script.remove()

        // @ts-ignore
        window.module = moduleExports

        resolve(window.module.exports)
      } else {
        reject(window.module.exports)
      }
    }

    script.addEventListener('load', handler)

    script.addEventListener('error', handler)

    document.body.appendChild(script)
  })
}
