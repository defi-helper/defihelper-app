import { createDomain, sample, guard } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import ProxyFactory from '@defihelper/networks/abi/ProxyFactory.json'
import { ethers } from 'ethers'
import networks from '@defihelper/networks/contracts.json'

import { automationApi } from '~/automations/common/automation.api'
import { Automates } from '../common/automation.types'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { protocolsApi } from '~/protocols/common'
import { userModel } from '~/users'

export const automationDeployContractDomain = createDomain()

export const fetchAutomationContractsFx =
  automationDeployContractDomain.createEffect(
    async (chainId: string | number) => {
      const data = await automationApi.getAutomationsContracts()

      const contracts: Automates[] = await Promise.all(
        data.map(async (contract) => {
          const contractData = await automationApi.getContractInterface({
            ...contract,
            chainId,
          })

          return {
            ...contract,
            contractInterface: contractData.abi,
            address: contractData.address,
          }
        })
      )

      return contracts
    }
  )

export const $automateContracts = automationDeployContractDomain
  .createStore<Automates[]>([])
  .on(fetchAutomationContractsFx.doneData, (_, payload) => payload)

export const deployFx = automationDeployContractDomain.createEffect(
  async (params: {
    inputs: string[]
    address?: string
    automate?: Automates
    account: string
    chainId: string
    provider: unknown
  }) => {
    const networkProvider = walletNetworkModel.getNetwork(
      params.provider,
      params.chainId
    )
    const wallets = userModel.$userWallets.getState()

    if (!params.automate) throw new Error('error')

    const network = networks[params.chainId as '3']

    const proxyFactory = new ethers.Contract(
      network.ProxyFactory.address,
      ProxyFactory.abi,
      networkProvider?.getSigner()
    )

    const tx = await proxyFactory.create(
      params.address,
      new ethers.utils.Interface(
        params.automate.contractInterface
      ).encodeFunctionData('init', params.inputs)
    )

    const receipt = await tx.wait()

    const proxyAddress: string = ethers.utils.defaultAbiCoder.decode(
      ['address'],
      receipt.logs[0].topics[2]
    )[0]

    const protocol = await protocolsApi.protocolDetail({
      filter: {
        adapter: params.automate.protocol,
      },
    })

    const currentWallet = wallets.find(
      (wallet) => wallet.address === params.account.toLowerCase()
    )

    if (!protocol || !currentWallet) throw new Error('something went wrong')

    const createdContract = await automationApi.createContract({
      input: {
        wallet: currentWallet.id,
        address: proxyAddress,
        adapter: params.automate.contract,
        protocol: protocol.id,
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
    filter: (chaiId): chaiId is string => Boolean(chaiId),
  }),
  target: fetchAutomationContractsFx,
})
