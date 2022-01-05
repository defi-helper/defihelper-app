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
  inputs?: { placeholder: string; value: string }[]
}

export type AdapterStep = {
  can: (...args: unknown[]) => Promise<boolean | Error>
  info: () => Promise<AdapterInfo>
  name: string
  send: (
    ...args: unknown[]
  ) => Promise<{ tx: { wait: () => Promise<unknown> } }>
}

export type AdapterActions = {
  stake: AdapterStep[]
  unstake: AdapterStep[]
  claim: AdapterStep[]
  exit: AdapterStep[]
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

export type AutomatesType = {
  contract: string
  deposit: AdapterStep[]
  refund: AdapterStep[]
  migrate: AdapterStep[]
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
