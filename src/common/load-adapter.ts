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

export interface AutomationAdapterActions {
  deposit: {
    name: 'automateRestake-deposit'
    methods: {
      balanceOf: () => Promise<string>
      canTransfer: (amount: string) => Promise<true | Error>
      transfer: (amount: string) => Promise<{ tx: Transaction }>
      transferred: () => Promise<string>
      canDeposit: () => Promise<true | Error>
      deposit: () => Promise<{ tx: Transaction }>
    }
  }
  refund: {
    name: 'automateRestake-refund'
    methods: {
      staked: () => Promise<string>
      can: () => Promise<true | Error>
      refund: () => Promise<{ tx: Transaction }>
    }
  }
  migrate: {
    name: 'automateRestake-migrate'
    methods: {
      staked: () => Promise<string>
      canWithdraw: () => Promise<true | Error>
      withdraw: () => Promise<{ tx: Transaction }>
    } & AutomationAdapterActions['deposit']['methods']
  }
}

type Transaction = { wait: () => Promise<{ transactionHash?: string }> }

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

export type GovernanceStake = {
  name: 'governanceSwap-stake'
  methods: {
    fromSymbol: () => string
    fromLink: () => string
    toSymbol: () => string
    toLink: () => string
    balanceOf: () => string
    isApproved: (amount: string) => Promise<boolean>
    approve: (amount: string) => Promise<{ tx?: Transaction }>
    can: (amount: string) => Promise<boolean | Error>
    stake: (amount: string) => Promise<{ tx?: Transaction }>
  }
}

export type GovernanceUnstake = {
  name: 'governanceSwap-unstake'
  methods: {
    fromSymbol: () => string
    fromLink: () => string
    toSymbol: () => string
    toLink: () => string
    balanceOf: () => Promise<string>
    can: (amount: string) => Promise<boolean | Error>
    unstake: (amount: string) => Promise<{ tx?: Transaction }>
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
  run: () => Promise<{ wait: () => Promise<{ transactionHash?: string }> }>
} & AutomationAdapterActions

export type DeployStep = {
  can: (...args: unknown[]) => Promise<boolean | Error>
  info: () => Promise<AdapterInfo>
  name: string
  send: (...args: unknown[]) => Promise<{
    tx: { wait: () => Promise<{ transactionHash?: string }> }
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
    ): Promise<{ tx?: { wait: () => Promise<{ transactionHash?: string }> } }>
    canBuy(tokenAddress: string, amount: string): Promise<boolean | Error>
    buy(
      tokenAddress: string,
      amount: string,
      slippage: string
    ): Promise<{ tx?: { wait: () => Promise<{ transactionHash?: string }> } }>
  }
}

export type SellLiquidity = {
  name: string
  methods: {
    balanceOf(): Promise<string>
    isApproved(amount: string): Promise<boolean | Error>
    approve(
      amount: string
    ): Promise<{ tx?: { wait: () => Promise<{ transactionHash?: string }> } }>
    canSell(amount: string): Promise<boolean | Error>
    sell(
      tokenAddress: string,
      amount: string,
      slippage: number | string
    ): Promise<{ tx?: { wait: () => Promise<{ transactionHash?: string }> } }>
  }
}

export type Adapters = {
  staking: AdapterFn
  swopfiStaking: AdapterFn
  masterChef: AdapterFn
  xJoe: AdapterFn
  tom: AdapterFn
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
    sellLiquidity: (
      signer: unknown,
      contractAddress: string,
      payload: unknown
    ) => Promise<SellLiquidity>
    store: (
      signer: unknown,
      contractAddress: string
    ) => Promise<{
      name: string
      canBuy(product: number | string): Promise<true | Error>
      buy(product: number | string): Promise<{ tx: Transaction }>
    }>
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
