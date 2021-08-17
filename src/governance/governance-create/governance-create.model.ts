import { createDomain } from 'effector-logger'
import { ethers } from 'ethers'
import { abi } from '~/abi'
import { bignumberUtils } from '~/common/bignumber-utils'
import { history } from '~/common/history'
import { paths } from '~/paths'

import { walletNetworkModel } from '~/wallets/wallet-networks'

export type ProposeParams = {
  addresses: string[]
  values: string[]
  signatures: string[]
  callDatas: string[]
  description: string
}

const GOVERNOR_BRAVO = '0xc8E942D9CA1e8dda3e39C7495A55086581D08858'

export const governanceCreateDomain = createDomain('governanceCreateDomain')

export const proposeFx = governanceCreateDomain.createEffect({
  name: 'proposeFx',
  handler: async (params: ProposeParams) => {
    const { networkProvider } = walletNetworkModel.getNetwork()

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
  },
})

proposeFx.done.watch(() => {
  history.push(paths.governance.list)
})
