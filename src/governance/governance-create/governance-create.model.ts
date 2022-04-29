import { createDomain } from 'effector-logger/macro'
import { ethers } from 'ethers'
import contracts from '@defihelper/networks/contracts.json'

import { abi } from '~/abi'
import { bignumberUtils } from '~/common/bignumber-utils'
import { history } from '~/common/history'
import { paths } from '~/paths'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { config } from '~/config'

export type ProposeParams = {
  addresses: string[]
  values: string[]
  signatures: string[]
  callDatas: string[]
  description: string
  account: string
  chainId: string
  provider: unknown
}

const GOVERNOR_BRAVO = contracts[config.DEFAULT_CHAIN_ID].GovernorBravo.address

export const governanceCreateDomain = createDomain()

export const proposeFx = governanceCreateDomain.createEffect(
  async (params: ProposeParams) => {
    const networkProvider = walletNetworkModel.getNetwork(
      params.provider,
      params.chainId
    )

    if (!networkProvider) return

    const governorBravo = new ethers.Contract(
      GOVERNOR_BRAVO,
      abi.GovernorBravo.abi,
      networkProvider.getSigner()
    )

    const gasLimit = bignumberUtils.estimateGas(
      await governorBravo.estimateGas.propose(
        params.addresses,
        params.values,
        params.signatures,
        params.callDatas,
        params.description
      )
    )

    const transactionReceipt = await governorBravo.propose(
      params.addresses,
      params.values,
      params.signatures,
      params.callDatas,
      params.description,
      {
        gasLimit,
      }
    )

    await transactionReceipt.wait()
  }
)

proposeFx.done.watch(() => {
  history.push(paths.governance.list)
})
