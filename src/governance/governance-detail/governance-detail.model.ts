import { createDomain, restore, sample } from 'effector-logger/macro'
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

const createContract = (provider: unknown, chainId: string) => {
  const networkProvider = walletNetworkModel.getNetwork(provider, chainId)

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
  account: string
  chainId: string
  provider: unknown
}

export const castVoteFx = governanceDetailDomain.createEffect(
  async ({ reason = '', ...restOfParams }: CastVoteWithReason) => {
    const governorBravo = createContract(
      restOfParams.proposalId,
      restOfParams.chainId
    )

    const transactionReceipt = await governorBravo.castVoteWithReason(
      restOfParams.proposalId,
      restOfParams.support,
      reason
    )

    await transactionReceipt.wait()
  }
)

export const executeFx = governanceDetailDomain.createEffect(
  async (params: {
    governanceId: number
    account: string
    chainId: string
    provider: unknown
  }) => {
    const governorBravo = createContract(params.provider, params.chainId)

    const gasLimit = bignumberUtils.estimateGas(
      await governorBravo.estimateGas.execute(params.governanceId)
    )

    const transactionReceipt = await governorBravo.execute(
      params.governanceId,
      {
        gasLimit,
      }
    )

    await transactionReceipt.wait()
  }
)

export const queueFx = governanceDetailDomain.createEffect(
  async (params: {
    governanceId: number
    account: string
    chainId: string
    provider: unknown
  }) => {
    const governorBravo = createContract(params.provider, params.chainId)

    const transactionReceipt = await governorBravo.queue(params.governanceId)

    await transactionReceipt.wait()
  }
)

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
