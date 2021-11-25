import { createDomain, sample, guard } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import ProxyFactory from '@defihelper/networks/abi/ProxyFactory.json'
import { ethers } from 'ethers'
import networks from '@defihelper/networks/contracts.json'

import { automationApi } from '~/automations/common/automation.api'
import { Automates } from '../common/automation.types'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { authModel } from '~/auth'
import { toastsService } from '~/toasts'

type DeployParams = {
  inputs: string[]
  address?: string
  contractInterface: Automates['contractInterface']
  contract: string
  adapter: string
  protocol: string
  account: string
  chainId: string
  provider: unknown
}

export const automationDeployContractDomain = createDomain()

export const fetchAutomationContractsFx =
  automationDeployContractDomain.createEffect(async (chainId: string) => {
    const data = await automationApi.getAutomationsContracts()

    const contracts = await data.reduce<Promise<Automates[]>>(
      async (acc, contract) => {
        const previousAcc = await acc

        const contractData = await automationApi
          .getContractInterface({
            ...contract,
            chainId,
          })
          .catch(console.error)

        if (!contractData) return previousAcc

        return [
          ...previousAcc,
          {
            ...contract,
            contractInterface: contractData.abi,
            address: contractData.address,
          },
        ]
      },
      Promise.resolve([])
    )

    return contracts
  })

export const $automateContracts = automationDeployContractDomain
  .createStore<Automates[]>([])
  .on(fetchAutomationContractsFx.doneData, (_, payload) => payload)

export const deployFx = automationDeployContractDomain.createEffect(
  async (params: DeployParams) => {
    const networkProvider = walletNetworkModel.getNetwork(
      params.provider,
      params.chainId
    )
    const wallets = authModel.$userWallets.getState()

    const network = networks[params.chainId as '3']

    const proxyFactory = new ethers.Contract(
      network.ProxyFactory.address,
      ProxyFactory.abi,
      networkProvider?.getSigner()
    )

    const tx = await proxyFactory.create(
      params.address,
      new ethers.utils.Interface(params.contractInterface).encodeFunctionData(
        'init',
        params.inputs
      )
    )

    const receipt = await tx.wait()

    const proxyAddress: string = ethers.utils.defaultAbiCoder.decode(
      ['address'],
      receipt.logs[0].topics[2]
    )[0]

    const currentWallet = wallets.find((wallet) => {
      return (
        (wallet.network === 'W'
          ? wallet.address === params.account
          : wallet.address === params.account.toLowerCase()) &&
        wallet.network === params.chainId
      )
    })

    if (!currentWallet) throw new Error('something went wrong')

    const createdContract = await automationApi.createContract({
      input: {
        wallet: currentWallet.id,
        address: proxyAddress,
        adapter: params.adapter,
        protocol: params.protocol,
        contract: params.contract,
        initParams: JSON.stringify({ inputs: params.inputs }),
      },
    })

    if (!createdContract) throw new Error('contract is not created')

    return createdContract
  }
)

export const AutomationDeployContractGate = createGate<string>({
  domain: automationDeployContractDomain,
  name: 'AutomationDeployContractGate',
})

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
