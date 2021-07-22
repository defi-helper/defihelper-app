import { useGate, useStore } from 'effector-react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { MainLayout } from '~/layouts'
import { ProposalForm } from '~/proposals/common'
import { proposalDetailModel } from '~/proposals/proposal-detail'
import * as model from './proposal-update.model'

export type ProposalUpdateProps = unknown

export const ProposalUpdate: React.VFC<ProposalUpdateProps> = () => {
  const params = useParams<{ proposalId: string }>()
  const proposal = useStore(proposalDetailModel.$proposalDetail)
  const proposalLoading = useStore(proposalDetailModel.fetchProposalFx.pending)

  const loading = useStore(model.updateProposalFx.pending)

  useGate(proposalDetailModel.Gate, params.proposalId)

  const defaultValues = useMemo(
    () =>
      proposal
        ? {
            title: proposal?.title,
            description: proposal?.description,
            status: proposal?.status,
          }
        : undefined,
    [proposal]
  )

  return (
    <MainLayout>
      {proposalLoading ? (
        'loading...'
      ) : (
        <ProposalForm
          defaultValues={defaultValues}
          loading={loading}
          onSubmit={(formValues) =>
            model.updateProposalFx({ id: params.proposalId, input: formValues })
          }
        />
      )}
    </MainLayout>
  )
}
