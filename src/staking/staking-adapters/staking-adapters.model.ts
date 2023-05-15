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
import { config } from '~/config'

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
  isUniV3?: boolean
  contractAddress?: string
}

const POSITION_MANAGER = '0xC36442b4a4522E871399CD717aBDD847Ab11FE88'
const ROUTER = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'
const QUOTER = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'
const AUTOROUTE_URL = config.IS_DEV
  ? 'https://uniswap-smart-order-router.defihelper.info'
  : 'https://uniswap-smart-order-router.defihelper.io'

export const buyLPFx = stakingAdaptersDomain.createEffect(
  async (params: BuyLiquidityParams) => {
    const { network } = params

    const tokens = await stakingApi.tokens({
      network: params.network,
      protocol: params.protocol,
    })

    if (isEmpty(tokens)) throw new Error('tokens are empty')

    if (!isNetworkKey(network)) throw new Error('wrong network')

    const currentNetworks = networks[network] as typeof networks['5']

    const currentAddress = params.isUniV3
      ? currentNetworks?.Uni3LPTokensManager?.address
      : currentNetworks?.LPTokensManager?.address

    if (!currentAddress) throw new Error('does not have a LPTokensManager')

    const networkProvider = walletNetworkModel.getNetwork(
      params.provider,
      params.chainId
    )

    if (!networkProvider) throw new Error('invalid provider')

    const adapterObj = await loadAdapter(buildAdaptersUrl('dfh'))

    const buyLiquidityUniv3 = params.isUniV3
      ? await adapterObj.automates.uni3.buyLiquidity(
          networkProvider.getSigner(),
          currentAddress,
          {
            positionManager: POSITION_MANAGER,
            router: ROUTER,
            quoter: QUOTER,
            autorouteURL: AUTOROUTE_URL,
            pool: params.contractAddress as string,
          }
        )
      : null
    const sellLiquidityUniv3 = params.isUniV3
      ? await adapterObj.automates.uni3.sellLiquidity(
          networkProvider.getSigner(),
          currentAddress,
          {
            positionManager: POSITION_MANAGER,
            router: ROUTER,
            quoter: QUOTER,
            autorouteURL: AUTOROUTE_URL,
            pool: params.contractAddress as string,
          }
        )
      : null

    const buyLiquidity = params.isUniV3
      ? null
      : await adapterObj.automates.buyLiquidity(
          networkProvider.getSigner(),
          currentAddress,
          {
            router: params.router,
            pair: params.pair,
          }
        )
    const sellLiquidity = params.isUniV3
      ? null
      : await adapterObj.automates.sellLiquidity(
          networkProvider.getSigner(),
          currentAddress,
          {
            router: params.router,
            pair: params.pair,
          }
        )

    return {
      buyLiquidityUniv3,
      sellLiquidityUniv3,
      buyLiquidity: params.isUniV3 ? null : buyLiquidity,
      sellLiquidity: params.isUniV3 ? null : sellLiquidity,
      tokens,
      networkProvider,
    }
  }
)

toastsService.forwardErrors(
  fetchContractAdapterFx.failData.map(parseError),
  buyLPFx.failData.map(parseError)
)
