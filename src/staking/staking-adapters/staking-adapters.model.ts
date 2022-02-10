import { createDomain, restore } from 'effector-logger/macro'
import networks from '@defihelper/networks/contracts.json'

import { loadAdapter, AdapterActions, Adapters } from '~/common/load-adapter'
import { toastsService } from '~/toasts'
import { buildAdaptersUrl } from '~/staking/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { parseError } from '~/common/parse-error'
import { Wallet } from '~/wallets/common'

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

export const stakingAdaptersDomain = createDomain()

export const fetchContractAdapterFx = stakingAdaptersDomain.createEffect(
  async (params: Params) => {
    const networkProvider = walletNetworkModel.getNetwork(
      params.provider,
      params.chainId
    )

    const { contract } = params

    const adapterObj = await loadAdapter(
      buildAdaptersUrl(params.protocolAdapter)
    )

    const adapterContract =
      adapterObj[contract.adapter as keyof Omit<Adapters, 'automates'>]

    const adapter = await adapterContract(networkProvider, contract.address, {
      blockNumber: 'latest',
      signer: networkProvider?.getSigner(),
    })

    const actions = params.account
      ? await adapter.actions(params.account)
      : null

    return {
      contractAddress: contract.address,
      actions,
    }
  }
)

export const action = stakingAdaptersDomain.createEvent<{
  action: keyof AdapterActions
  contractId: string
} | null>()

export const $actionLoading = restore(action, null)

export const stake = stakingAdaptersDomain.createEvent<ContractAction>()

const MockTokens = [
  {
    address: '0x0a180a76e4466bf68a7f86fb029bed3cccfaaac5',
    symbol: 'WETH',
  },
]

export const buyLPFx = stakingAdaptersDomain.createEffect(
  async (params: { account: string; chainId: string; provider: unknown }) => {
    const networkProvider = walletNetworkModel.getNetwork(
      params.provider,
      params.chainId
    )

    if (!networkProvider) return

    const adapterObj = await loadAdapter(buildAdaptersUrl('dfh'))

    const result = await adapterObj.automates.buyLiquidity(
      networkProvider.getSigner(),
      networks[3].BuyLiquidity.address,
      {
        tokens: MockTokens,
        router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
        pair: '0xffdeca9081a5627a95249a19bd5ff5eba94228cf',
      }
    )

    return result.buy
  }
)

toastsService.forwardErrors(
  fetchContractAdapterFx.failData.map(parseError),
  buyLPFx.failData.map(parseError)
)
