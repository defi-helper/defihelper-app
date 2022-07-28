import { createDomain, sample, guard, restore } from 'effector'
import { createGate } from 'effector-react'
import networks from '@defihelper/networks/contracts.json'

import { automationApi } from '~/automations/common/automation.api'
import { Automates } from '../common/automation.types'
import { toastsService } from '~/toasts'
import { loadAdapter } from '~/common/load-adapter'
import { buildAdaptersUrl, stakingApi } from '~/staking/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as settingsWalletModel from '~/settings/settings-wallets/settings-wallets.model'
import { authModel } from '~/auth'
import { AutomateContractTypeEnum } from '~/api'

type DeployParams = {
  inputs: string[]
  contract: string
  adapter: string
  protocol: string
  account: string
  chainId: string
  provider: unknown
  proxyAddress: string
}

export const automationDeployContractDomain = createDomain()

export const AutomationDeployContractGate = createGate<string>({
  domain: automationDeployContractDomain,
  name: 'AutomationDeployContractGate',
})

export const fetchAutomationContractsFx =
  automationDeployContractDomain.createEffect(async (chainId: string) => {
    const data = await automationApi.getAutomationsContracts()

    const contracts = await data.reduce<Promise<Automates[]>>(
      async (acc, contract) => {
        const previousAcc = await acc

        const contractData = await automationApi
          .getContractAddress({
            ...contract,
            chainId,
          })
          .catch(console.error)

        if (!contractData) return previousAcc

        return [
          ...previousAcc,
          {
            ...contract,
            address: contractData.address,
          },
        ]
      },
      Promise.resolve([])
    )

    return contracts
  })

export const fetchDeployAdapterFx = automationDeployContractDomain.createEffect(
  async (
    params: Required<Omit<Automates, 'id'>> & {
      chainId: string
      provider: unknown
      contractAddress?: unknown
    }
  ) => {
    const adapterObj = await loadAdapter(buildAdaptersUrl(params.protocol))

    const networkProvider = walletNetworkModel.getNetwork(
      params.provider,
      params.chainId
    )

    const adapterContract = adapterObj.automates.deploy[params.contract]

    const network = networks[params.chainId as keyof typeof networks]

    const adapter = await adapterContract(
      networkProvider?.getSigner(),
      network.ProxyFactory.address,
      params.address,
      params.contractAddress
    )

    return adapter
  }
)

export const $automateContracts = automationDeployContractDomain
  .createStore<Automates[]>([])
  .on(fetchAutomationContractsFx.doneData, (_, payload) => payload)
  .reset(AutomationDeployContractGate.close, authModel.logoutFx)

export const $deployAdapter = restore(
  fetchDeployAdapterFx.doneData,
  null
).reset(AutomationDeployContractGate.close, authModel.logoutFx)

export const deployFx = automationDeployContractDomain.createEffect(
  async (params: DeployParams) => {
    const wallets = settingsWalletModel.$wallets.getState()

    const currentWallet = wallets.find((wallet) => {
      return (
        (wallet.network === 'main'
          ? wallet.address === params.account
          : wallet.address === params.account.toLowerCase()) &&
        wallet.network === params.chainId
      )
    })

    if (!currentWallet) throw new Error('something went wrong')

    const createdContract = await stakingApi.createAutomatesContract({
      input: {
        wallet: currentWallet.id,
        address: params.proxyAddress,
        adapter: params.adapter,
        protocol: params.protocol,
        contract: params.contract,
        type: AutomateContractTypeEnum.Autorestake,
        initParams: JSON.stringify({
          inputs: params.inputs,
        }),
      },
    })

    if (!createdContract) throw new Error('contract is not created')

    return createdContract
  }
)

sample({
  clock: guard({
    source: AutomationDeployContractGate.state,
    clock: [
      AutomationDeployContractGate.open,
      AutomationDeployContractGate.state.updates,
    ],
    filter: (chaiId) => typeof chaiId === 'string' && Boolean(chaiId.length),
  }),
  target: fetchAutomationContractsFx,
})

toastsService.forwardErrors(
  fetchAutomationContractsFx.failData,
  deployFx.failData
)
