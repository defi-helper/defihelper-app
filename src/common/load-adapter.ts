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

export type SmartTradeRouter = {
  name: 'DFHSmartTradeRouter'
  methods: {
    fee(): Promise<string>
    order(id: number | string): Promise<{
      id: string
      owner: string
      status: '0' | '1' | '2'
      handler: string
      callData: string
    }>
    balanceOf(tokenAddress: string): Promise<string>
    depositBalanceOf(tokenAddress: string): Promise<string>
    isApproved(tokenAddress: string, amount: string): Promise<true | Error>
    approve(
      tokenAddress: string,
      amount: string
    ): Promise<{ tx: Transaction | undefined }>
    canRefund(
      orderId: string,
      refund: Array<{ token: string; amount: string }>
    ): Promise<true | Error>
    refund(
      orderId: string,
      refund: Array<{ token: string; amount: string }>
    ): Promise<{ tx: Transaction | undefined }>
  }
}

export type SmartTradeSwapHandler = {
  name: 'DFHSmartTradeSwapHandler'
  methods: {
    amountOut(
      exchangeAddress: string,
      path: string[],
      amountIn: string
    ): Promise<string>
    isApproved(tokenAddress: string, amount: string): Promise<true | Error>
    approve(
      tokenAddress: string,
      amount: string
    ): Promise<{ tx: Transaction | undefined | undefined }>
    canCancelOrder(id: string | number): Promise<true | Error>
    cancelOrder(id: string | number): Promise<{ tx: Transaction | undefined }>
    emergencyHandleOrder(
      id: string,
      deadline: Date
    ): Promise<{ tx: Transaction | undefined }>
    createOrder: (
      exchangeAddress: string,
      path: string[],
      amountIn: string,
      stopLoss: {
        amountOut: string
        slippage: string | number
        moving: boolean
      } | null,
      stopLoss2: {
        amountOut: string
        slippage: string | number
        moving: boolean
      } | null,
      takeProfit: {
        amountOut: string
        slippage: string | number
      } | null,
      activate: {
        amountOut: string
        direction: 'gt' | 'lt'
      } | null,
      deposit: {
        native?: string
      }
    ) => Promise<{
      tx: Transaction
      handler: string
      callDataRaw: string
      callData: {
        exchange: string
        pair: string
        path: string[]
        tokenInDecimals: number
        tokenOutDecimals: number
        amountIn: string
        amountOut: string
        stopLoss: {
          amountOut: string
          slippage: string
          amountOutMin: string
          moving: boolean
          direction: 'gt' | 'lt'
        } | null
        takeProfit: {
          amountOut: string
          slippage: string
          amountOutMin: string
          moving: boolean
          direction: 'gt' | 'lt'
        } | null
        stopLoss2: {
          amountOut: string
          slippage: string
          amountOutMin: string
          moving: boolean
          direction: 'gt' | 'lt'
        } | null
        activate: {
          amountOut: string
          direction: 'gt' | 'lt'
        } | null
      }
      getOrderNumber: () => Promise<string>
    }>
  }
}

export interface SmartTrade {
  router: (
    signer: unknown,
    contractAddress: string
  ) => Promise<SmartTradeRouter>
  swapHandler: (
    signer: unknown,
    contractAddress: string
  ) => Promise<SmartTradeSwapHandler>
}

export interface AutomationAdapterActions {
  deposit: {
    name: 'automateRestake-deposit'
    methods: {
      tokenAddress: () => string
      symbol: () => string
      balanceOf: () => Promise<string>
      isApproved: (amount: string) => Promise<boolean | Error>
      approve: (amount: string) => Promise<{ tx?: Transaction } | Error>
      canDeposit: (amount: string) => Promise<true | Error>
      deposit: (amount: string) => Promise<{ tx: Transaction }>
      tokenPriceUSD: () => Promise<string>
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
  stopLoss: StopLossComponent
}

type Transaction = {
  hash: string
  wait: () => Promise<{ transactionHash: string }>
}

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

export interface StopLossComponent {
  name: 'automateRestake-stopLoss'
  methods: {
    startTokens: () => Promise<string[]>
    autoPath: (from: string, to: string) => Promise<string[]>
    amountOut: (path: string[]) => Promise<string>
    canSetStopLoss: (
      path: string[],
      amountOut: string,
      amountOutMin: string
    ) => Promise<true | Error>
    setStopLoss: (
      path: string[],
      amountOut: string,
      amountOutMin: string
    ) => Promise<{ tx: Transaction }>
    removeStopLoss: () => Promise<{ tx: Transaction }>
  }
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
    fee(): Promise<{
      native: string
      usd: string
    }>
    balanceETHOf: () => Promise<string>
    canBuyETH: (amount: string) => Promise<true | Error>
    buyETH: (
      amount: string,
      slippage: number | string,
      deadlineSeconds?: number
    ) => Promise<{ tx?: Transaction }>
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
    fee(): Promise<{
      native: string
      usd: string
    }>
    amountOut(tokenAddress: string, amount: string): Promise<string>
    sellETH: (
      amount: string,
      slippage: number | string,
      deadlineSeconds?: number
    ) => Promise<{ tx?: Transaction }>
  }
}

export type BalanceAdapter = {
  name: string
  balance(): Promise<string>
  netBalance(): Promise<string>
  canDeposit(amount: string): Promise<true | Error>
  deposit(amount: string): Promise<{ tx: Transaction }>
  canRefund(amount: string): Promise<true | Error>
  refund(amount: string): Promise<{ tx: Transaction }>
}

export type Adapters = {
  staking: AdapterFn
  swopfiStaking: AdapterFn
  masterChef: AdapterFn
  xJoe: AdapterFn
  tom: AdapterFn
  store: (
    signer: unknown,
    contractAddress: string
  ) => Promise<{
    name: string
    canBuy(product: number | string): Promise<true | Error>
    buy(product: number | string): Promise<{ tx: Transaction }>
  }>
  balance: (signer: unknown, contractAddress: string) => Promise<BalanceAdapter>
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
    smartTrade: SmartTrade
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
