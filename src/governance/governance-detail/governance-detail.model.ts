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
import { GovReceiptFilterInputType } from '~/graphql/_generated-types'

const GOVERNOR_BRAVO =
  contracts[config.IS_DEV ? '3' : '1'].GovernorBravo.address

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

export const governanceDetailDomain = createDomain()

export const fetchGovernanceProposalFx = governanceDetailDomain.createEffect(
  (proposalId: number) =>
    governanceApi
      .detail({
        filter: {
          proposalId,
          network: config.IS_DEV ? '3' : '1',
          contract: GOVERNOR_BRAVO,
          cache: true,
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
      )
)

export const fetchReceiptFx = governanceDetailDomain.createEffect(
  async (params: Omit<GovReceiptFilterInputType, 'cache'>) =>
    governanceApi.receipt({
      filter: {
        ...params,
        cache: true,
      },
    })
)

export const $receipt = restore(fetchReceiptFx.doneData, null)

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

export const castVoteFx = governanceDetailDomain.createEffect(
  async ({ reason = '', ...restOfParams }: CastVoteWithReason) => {
    const governorBravo = createContract(
      restOfParams.provider,
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

sample({
  source: GovernanceDetailGate.state,
  clock: [queueFx.done, executeFx.done, castVoteFx.done],
  fn: (proposalId, { params }) => ({
    network: Number(params.chainId),
    contract: GOVERNOR_BRAVO,
    proposalId: Number(proposalId),
    wallet: params.account,
  }),
  target: fetchReceiptFx,
})

$governanceDetail.reset(GovernanceDetailGate.close)
$receipt.reset(GovernanceDetailGate.close)
