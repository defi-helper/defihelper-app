import {
  createStore,
  createEffect,
  createEvent,
  UnitValue,
  combine,
  guard,
  sample,
} from 'effector'
import contracts from '@defihelper/networks/contracts.json'

import { loadAdapter } from '~/common/load-adapter'
import { buildAdaptersUrl } from '~/staking/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { tradeApi } from './common/trade.api'
import { config } from '~/config'

export const reset = createEvent()

export const networks: Record<string, string> = {
  1: 'eth',
  137: 'matic',
  56: 'bsc',
  250: 'fantom',
  42161: 'arbitrum',
  25: 'cronos',
  43114: 'avalanch',
  106: 'velas',
  ...(config.IS_DEV ? { 5: 'eth' } : {}),
}

export const fetchPairsFx = createEffect(
  async ({
    signal,
    ...params
  }: {
    network: string
    exchange: string
    signal: AbortSignal
  }) => {
    const { data, message } = await tradeApi.pairs({
      network: [networks[params.network]],
      pool: [params.exchange],
      signal,
    })

    if (!data || message) throw new Error(message ?? 'something went wrong')

    return data.list
  }
)

export const $pairs = createStore<UnitValue<typeof fetchPairsFx.doneData>>([])
  .on(fetchPairsFx.doneData, (_, payload) => payload)
  .reset(reset)

export const fetchTokensAliasFx = createEffect(async (symbols: string[]) => {
  return tradeApi.tokenAlias({
    filter: {
      symbol: symbols,
    },
  })
})

export const $tokensAlias = createStore<
  UnitValue<typeof fetchTokensAliasFx.doneData>
>({})
  .on(fetchTokensAliasFx.doneData, (_, payload) => payload)
  .reset(reset)

export const $pairsWithAlias = combine(
  $pairs,
  $tokensAlias,
  (pairs, tokensAlias) => {
    return pairs.map((pair) => ({
      ...pair,
      tokensAlias: pair.pairInfo.tokens.map(
        ({ symbol }) => tokensAlias?.[symbol] ?? null
      ),
    }))
  }
)

sample({
  clock: guard({
    clock: $pairs.updates,
    filter: (pairs) => Boolean(pairs.length),
  }),
  fn: (pairs) =>
    pairs.flatMap((pair) =>
      pair.pairInfo.tokens.flatMap(({ symbol }) => symbol)
    ),
  target: fetchTokensAliasFx,
})

export const fetchExchangesFx = createEffect(
  async ({ network, signal }: { network: string; signal: AbortSignal }) => {
    const poolInfo = await tradeApi.poolInfo([networks[network]], signal)

    if (!poolInfo.code || poolInfo.message)
      throw new Error(poolInfo.message ?? 'something went wrong')

    const exchanges = poolInfo.data
      .map(({ Liquidity, Icon, DexName, Routers }) => ({
        Liquidity,
        Icon,
        Name: DexName,
        Address: Routers?.[0]?.Address,
      }))
      .sort((a, b) => (a.Liquidity > b.Liquidity ? -1 : 1))

    if (!config.IS_DEV) return exchanges

    return [
      {
        Icon: 'https://whattofarm.io/assets/dex/0x800b052609c355cA8103E06F022aA30647eAd60a',
        Name: 'Uniswap dev',
        Address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      },
      ...exchanges,
    ]
  }
)

export const $exchanges = createStore<
  UnitValue<typeof fetchExchangesFx.doneData>
>([])
  .on(fetchExchangesFx.doneData, (_, payload) => payload)
  .reset(reset)

export const fetchHistoryFx = createEffect((params: { address: string }) =>
  tradeApi.history({
    address: params.address,
    from: '1660012666',
    to: '1661164666',
    countback: 320,
  })
)

export const $history = createStore<UnitValue<
  typeof fetchHistoryFx.doneData
> | null>(null)
  .on(fetchHistoryFx.doneData, (_, payload) => payload)
  .reset(reset)

export const fetchAdapterFx = createEffect(
  async (params: { provider: unknown; chainId: string }) => {
    const networkProvider = walletNetworkModel.getNetwork(
      params.provider,
      params.chainId
    )

    const contract = contracts[params.chainId as keyof typeof contracts]

    if (!('SmartTradeRouter' in contract)) throw new Error('wrong chain id')
    if (!('SmartTradeSwapHandler' in contract))
      throw new Error('wrong chain id')

    if (!networkProvider) throw new Error('provider is not defined')

    const { automates } = await loadAdapter(buildAdaptersUrl('dfh'))

    const { smartTrade } = automates

    return {
      router: (
        await smartTrade.router(
          networkProvider.getSigner(),
          contract.SmartTradeRouter.address
        )
      ).methods,
      swap: (
        await smartTrade.swapHandler(
          networkProvider.getSigner(),
          contract.SmartTradeSwapHandler.address
        )
      ).methods,
    }
  }
)

export const $adapter = createStore<UnitValue<
  typeof fetchAdapterFx.doneData
> | null>(null)
  .on(fetchAdapterFx.doneData, (_, payload) => payload)
  .reset(reset)
