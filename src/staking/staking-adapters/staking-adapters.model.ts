/* eslint-disable @typescript-eslint/no-explicit-any */
import { createDomain, restore } from 'effector'
import networks from '@defihelper/networks/contracts.json'
import isEmpty from 'lodash.isempty'

import {
  loadAdapter,
  AdapterActions,
  Adapters,
  AdapterFn,
} from '~/common/load-adapter'
import { toastsService } from '~/toasts'
import { buildAdaptersUrl, stakingApi } from '~/staking/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { parseError } from '~/common/parse-error'
import { Wallet } from '~/wallets/common'
import { BlockchainEnum } from '~/api/_generated-types'

export type StakingAdapter = {
  actions: null | AdapterActions
  contractAddress: string
}

export type Contract = {
  address: string
  adapter: string
}

type Params = {
  protocolAdapter: string
  contract: Contract
  provider: unknown
  account: string
  chainId: string
}

export type ContractAction = {
  contractId: string
  wallet: Wallet
}

export const isNetworkKey = (
  network: string
): network is keyof typeof networks => {
  return network in networks
}

export const stakingAdaptersDomain = createDomain()

export const fetchAdapterFx = stakingAdaptersDomain.createEffect(
  async (params: Params) => {
    const { contract } = params

    const adapterObj = await loadAdapter(
      buildAdaptersUrl(params.protocolAdapter)
    )

    const adapterContract = adapterObj[contract.adapter as keyof Adapters]

    return adapterContract
  }
)

export const fetchContractAdapterFx = stakingAdaptersDomain.createEffect(
  async (params: Params) => {
    const networkProvider = walletNetworkModel.getNetwork(
      params.provider,
      params.chainId
    )

    const { contract } = params

    const adapterContract = (await fetchAdapterFx(params)) as AdapterFn

    const adapter = await adapterContract(networkProvider, contract.address, {
      blockNumber: 'latest',
      signer: networkProvider?.getSigner(),
    })

    const actions =
      params.account && adapter.actions
        ? await adapter.actions(params.account)
        : null

    return {
      contractAddress: contract.address,
      actions,
      positions: adapter.wallet,
    }
  }
)

export const action = stakingAdaptersDomain.createEvent<{
  action: keyof AdapterActions
  contractId: string
} | null>()

export const $actionLoading = restore(action, null)

export const stake = stakingAdaptersDomain.createEvent<ContractAction>()

type BuyLiquidityParams = {
  account: string
  chainId: string
  provider: unknown
  router: string
  pair: string
  network: string
  protocol: BlockchainEnum
}

export const buyLPFx = stakingAdaptersDomain.createEffect(
  async (params: BuyLiquidityParams) => {
    const { network } = params

    const tokens = await stakingApi.tokens({
      network: params.network,
      protocol: params.protocol,
    })

    if (isEmpty(tokens)) throw new Error('tokens are empty')

    if (!isNetworkKey(network)) throw new Error('wrong network')

    const currentAddress = (networks[network] as any)?.LPTokensManager?.address

    if (!currentAddress) throw new Error('does not have a LPTokensManager')

    const networkProvider = walletNetworkModel.getNetwork(
      params.provider,
      params.chainId
    )

    if (!networkProvider) throw new Error('invalid provider')

    const adapterObj = await loadAdapter(buildAdaptersUrl('dfh'))

    const buyLiquidity = await adapterObj.automates.buyLiquidity(
      networkProvider.getSigner(),
      currentAddress,
      {
        router: params.router,
        pair: params.pair,
      }
    )
    const sellLiquidity = await adapterObj.automates.sellLiquidity(
      networkProvider.getSigner(),
      currentAddress,
      {
        router: params.router,
        pair: params.pair,
      }
    )

    return {
      buyLiquidity,
      sellLiquidity,
      tokens,
      networkProvider,
    }
  }
)

toastsService.forwardErrors(
  fetchContractAdapterFx.failData.map(parseError),
  buyLPFx.failData.map(parseError)
)
