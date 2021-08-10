import { useStore } from 'effector-react'

import { AppLayout } from '~/layouts'
import { ProposalForm } from '~/proposals/common'
import * as model from './proposal-create.model'

export type ProposalCreateProps = unknown

export const ProposalCreate: React.VFC<ProposalCreateProps> = () => {
  const loading = useStore(model.createProposalFx.pending)

  return (
    <AppLayout>
      <ProposalForm loading={loading} onSubmit={model.createProposal} />
    </AppLayout>
  )
}
