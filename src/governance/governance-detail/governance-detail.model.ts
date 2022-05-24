import { createDomain, restore, sample, guard } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import { ethers } from 'ethers'
import contracts from '@defihelper/networks/contracts.json'
import type { AbstractConnector } from '@web3-react/abstract-connector'

import { abi } from '~/abi'
import { bignumberUtils } from '~/common/bignumber-utils'
import { config } from '~/config'
import {
  governanceApi,
  parseDescription,
  parseActions,
} from '~/governance/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { GovReceiptFilterInputType } from '~/api/_generated-types'

const GOVERNOR_BRAVO = contracts[config.DEFAULT_CHAIN_ID].GovernorBravo.address

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
  cache: boolean
}

export const governanceDetailDomain = createDomain()

export const fetchGovernanceProposalFx = governanceDetailDomain.createEffect(
  (proposalId: number) =>
    governanceApi
      .detail({
        filter: {
          proposalId,
          network: '1',
          contract: '0x7725c6045092DEB243ae23aFB4355f43aAC1FC22',
          cache: !config.IS_DEV,
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
  async (params: GovReceiptFilterInputType) =>
    governanceApi.receipt({
      filter: params,
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
    cache: boolean
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
    cache: boolean
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

const openedGate = sample({
  clock: guard({
    source: walletNetworkModel.$wallet,
    clock: [walletNetworkModel.$wallet, GovernanceDetailGate.open],
    filter: (
      wallet
    ): wallet is {
      chainId: string
      account: string
      connector: AbstractConnector
      blockchain: string
    } => Boolean(wallet),
  }),
  fn: (params) => ({
    params: {
      ...params,
      cache: !config.IS_DEV,
    },
  }),
})

sample({
  source: GovernanceDetailGate.state,
  clock: [queueFx.done, executeFx.done, castVoteFx.done, openedGate],
  fn: (proposalId, { params }) => ({
    network: Number(params.chainId),
    contract: GOVERNOR_BRAVO,
    proposalId: Number(proposalId),
    wallet: params.account,
    cache: params.cache,
  }),
  target: fetchReceiptFx,
})

$governanceDetail.reset(GovernanceDetailGate.close)
$receipt.reset(GovernanceDetailGate.close)
