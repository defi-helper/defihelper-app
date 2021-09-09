import { createDomain, restore, sample } from 'effector-logger'
import { createGate } from 'effector-react'
import { ethers } from 'ethers'
import contracts from '@defihelper/networks/contracts.json'

import { abi } from '~/abi'
import { bignumberUtils } from '~/common/bignumber-utils'
import { config } from '~/config'
import {
  governanceApi,
  parseDescription,
  parseActions,
} from '~/governance/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'

const GOVERNOR_BRAVO = contracts[3].GovernorBravo.address

export const governanceDetailDomain = createDomain('governanceDetailDomain')

export const fetchGovernanceProposalFx = governanceDetailDomain.createEffect({
  name: 'fetchGovernanceProposalFx',
  handler: (proposalId: number) =>
    governanceApi
      .detail({
        filter: {
          proposalId,
          network: config.IS_DEV ? '3' : '1',
          contract: GOVERNOR_BRAVO,
          cache: false,
        },
      })
      .then((governanceProposal) =>
        governanceProposal
          ? {
              ...governanceProposal,
              ...parseDescription(governanceProposal.description),
              actions: parseActions(
                governanceProposal.targets,
                governanceProposal.calldatas,
                governanceProposal.signatures
              ),
            }
          : null
      ),
})

const createContract = () => {
  const { networkProvider } = walletNetworkModel.getNetwork()

  if (!networkProvider) {
    throw new Error('networkprovider is null')
  }

  return new ethers.Contract(
    GOVERNOR_BRAVO,
    abi.GovernorBravo.abi,
    networkProvider.getSigner()
  )
}

export enum CastVotes {
  against,
  for,
  abstain,
}

type CastVoteWithReason = {
  proposalId: number
  support: CastVotes
  reason?: string
}

export const castVoteFx = governanceDetailDomain.createEffect({
  name: 'castVoteFx',
  handler: async ({ reason = '', ...restOfParams }: CastVoteWithReason) => {
    const governorBravo = createContract()

    const transactionReceipt = await governorBravo.castVoteWithReason(
      restOfParams.proposalId,
      restOfParams.support,
      reason
    )

    await transactionReceipt.wait()
  },
})

export const executeFx = governanceDetailDomain.createEffect({
  name: 'executeFx',
  handler: async (governanceId: number) => {
    const governorBravo = createContract()

    const gasLimit = bignumberUtils.estimateGas(
      await governorBravo.estimateGas.execute(governanceId)
    )

    const transactionReceipt = await governorBravo.execute(governanceId, {
      gasLimit,
    })

    await transactionReceipt.wait()
  },
})

export const queueFx = governanceDetailDomain.createEffect({
  name: 'queueFx',
  handler: async (governanceId: number) => {
    const governorBravo = createContract()

    const transactionReceipt = await governorBravo.queue(governanceId)

    await transactionReceipt.wait()
  },
})

export const $governanceDetail = restore(
  fetchGovernanceProposalFx.doneData,
  null
)

export const GovernanceDetailGate = createGate<string>({
  name: 'GovernanceDetailGate',
  domain: governanceDetailDomain,
})

sample({
  clock: GovernanceDetailGate.open,
  fn: (clock) => Number(clock),
  target: fetchGovernanceProposalFx,
})
