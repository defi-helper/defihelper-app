import { createEffect } from 'effector-logger/macro'
import ProxyFactory from '@defihelper/networks/abi/ProxyFactory.json'
import { ethers } from 'ethers'
import networks from '@defihelper/networks/contracts.json'

import { walletNetworkModel } from '~/wallets/wallet-networks'
import { Automates } from '../common/automation.types'
import { automationApi } from '../common/automation.api'

export const deployFx = createEffect(
  async (params: {
    inputs: string[]
    address?: string
    contractId: string
    automate?: Automates
  }) => {
    const { networkProvider, chainId } = walletNetworkModel.getNetwork()

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

    await tx.wait()

    const updatedContract = await automationApi.updateContract({
      input: {
        id: params.contractId,
        initParams: JSON.stringify({ inputs: params.inputs }),
      },
    })

    if (!updatedContract) throw new Error('contract is not updated')

    return updatedContract
  }
)
