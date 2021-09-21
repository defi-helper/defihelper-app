import { createDomain, sample, guard } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import ProxyFactory from '@defihelper/networks/abi/ProxyFactory.json'
import { ethers } from 'ethers'
import networks from '@defihelper/networks/contracts.json'

import { automationApi } from '~/automations/common/automation.api'
import { Automates } from '../common/automation.types'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import mock from './mock.json'
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

fetchAutomationContractsFx.use(async () => {
  const data = [
    { protocol: 'bondappetit', contract: 'SynthetixUniswapLpRestake' },
  ]

  const contracts: Automates[] = await Promise.all(
    data.map(async (contract) => ({
      ...contract,
      contractInterface: mock.abi as Automates['contractInterface'],
      address: mock.address,
    }))
  )

  return contracts
}) // TODO: remove

export const $automateContracts = automationDeployContractDomain
  .createStore<Automates[]>([])
  .on(fetchAutomationContractsFx.doneData, (_, payload) => payload)

export const deployFx = automationDeployContractDomain.createEffect(
  async (params: {
    inputs: string[]
    address?: string
    automate?: Automates
  }) => {
    const {
      networkProvider,
      chainId,
      account = null,
    } = walletNetworkModel.getNetwork()
    const wallets = userModel.$userWallets.getState()

    if (!params.automate) throw new Error('error')

    const network = networks[chainId as '3']

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
      (wallet) => wallet.address === account?.toLowerCase()
    )

    if (!protocol || !currentWallet) throw new Error('something went wrong')

    const createdContract = await automationApi.createContract({
      input: {
        wallet: currentWallet.id,
        address: proxyAddress,
        adapter: params.automate.contract,
        protocol: protocol.id,
      },
    })

    if (!createdContract) throw new Error('contract is not created')

    return createdContract
  }
)

export const AutomationDeployContractGate = createGate({
  domain: automationDeployContractDomain,
  name: 'AutomationDeployContractGate',
})

sample({
  clock: guard({
    source: [AutomationDeployContractGate.status, walletNetworkModel.$wallet],
    clock: [
      AutomationDeployContractGate.open,
      walletNetworkModel.$wallet.updates,
    ],
    filter: (source): source is [boolean, { chainId: string | number }] => {
      const [status, wallet] = source

      return status && Boolean(wallet.chainId)
    },
  }),
  fn: ([, wallet]) => wallet.chainId,
  target: fetchAutomationContractsFx,
})
