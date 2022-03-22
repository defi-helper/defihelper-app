/* eslint-disable @typescript-eslint/ban-ts-comment */

const ERROR = 'AdapterFn not loaded'

const moduleExports = {
  exports: new Error(ERROR),
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

export type AdapterInfo = {
  description: string
  inputs?: {
    placeholder: string
    value: string
    type: string
    options?: {
      label: string
      value: string
    }[]
  }[]
}

type Transaction = { wait: () => Promise<unknown> }

export type AdapterStep = {
  can: (...args: unknown[]) => Promise<boolean | Error>
  info: () => Promise<AdapterInfo>
  name: string
  send: (...args: unknown[]) => Promise<{ tx: Transaction }>
}

type Claim = {
  name: 'staking-claim'
  methods: {
    link: () => string
    balanceOf: () => Promise<string>
    can: (amount: string) => Promise<boolean | Error>
    claim: (amount: string) => Promise<{ tx: Transaction }>
    symbol: () => string
  }
}

type Exit = {
  name: 'staking-exit'
  methods: {
    can: (amount: string) => Promise<boolean | Error>
    exit: (amount: string) => Promise<{ tx: Transaction }>
  }
}

type Stake = {
  name: 'staking-stake'
  methods: {
    link: () => string
    balanceOf: () => Promise<string>
    isApproved: (amount: string) => Promise<boolean>
    approve: (amount: string) => Promise<{ tx: Transaction }>
    can: (amount: string) => Promise<boolean | Error>
    stake: (amount: string) => Promise<{ tx: Transaction }>
    symbol: () => string
  }
}

type Unstake = {
  name: 'staking-unstake'
  methods: {
    link: () => string
    balanceOf: () => Promise<string>
    can: (amount: string) => Promise<boolean | Error>
    unstake: (amount: string) => Promise<{ tx: Transaction }>
    symbol: () => string
  }
}

export type AdapterActions = {
  stake: Stake
  unstake: Unstake
  claim: Claim
  exit: Exit
}

type Part = {
  address: string
  decimals: number
  priceUSD: string
}

export type Adapter = {
  stakeToken: {
    parts: Part[]
  } & Part
  rewardToken: Part
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

export type AutomatesType = {
  contract: string
  deposit: AdapterStep[]
  refund: AdapterStep[]
  migrate: AdapterStep[]
  run: () => Promise<{ wait: () => Promise<unknown> }>
}

export type DeployStep = {
  can: (...args: unknown[]) => Promise<boolean | Error>
  info: () => Promise<AdapterInfo>
  name: string
  send: (...args: unknown[]) => Promise<{
    tx: { wait: () => Promise<unknown> }
    getAddress: () => Promise<string>
  }>
}

export type DeployType = {
  deploy: DeployStep[]
}

export type BuyLiquidity = {
  name: string
  methods: {
    balanceOf(tokenAddress: string): Promise<string>
    isApproved(tokenAddress: string, amount: string): Promise<boolean | Error>
    approve(
      tokenAddress: string,
      amount: string
    ): Promise<{ tx?: { wait: () => Promise<unknown> } }>
    canBuy(tokenAddress: string, amount: string): Promise<boolean | Error>
    buy(
      tokenAddress: string,
      amount: string,
      slippage: string
    ): Promise<{ tx?: { wait: () => Promise<unknown> } }>
  }
}

export type Adapters = {
  staking: AdapterFn
  swopfiStaking: AdapterFn
  masterChef: AdapterFn
  automates: Record<
    string,
    (signer: unknown, contractAddress: unknown) => Promise<AutomatesType>
  > & {
    deploy: Record<
      string,
      (
        signer: unknown,
        factoryAddress: unknown,
        prototypeAddress: unknown,
        contractAddress?: unknown
      ) => Promise<DeployType>
    >
    buyLiquidity: (
      signer: unknown,
      contractAddress: string,
      payload: unknown
    ) => Promise<BuyLiquidity>
  }
}

const cache: Record<string, Adapters> = {}

export function loadAdapter(url: string): Promise<Adapters> {
  if (cache[url]) return Promise.resolve(cache[url])

  // @ts-ignore
  window.module = moduleExports

  return import(/* webpackIgnore: true */ url).then(() => {
    cache[url] = window.module.exports

    // @ts-ignore
    window.module = moduleExports

    return cache[url]
  })
}
