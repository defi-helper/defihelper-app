import { useGate, useStore } from 'effector-react'
import { useParams } from 'react-router-dom'

import { useQueryParams } from '~/common/hooks'
import { AppLayout } from '~/layouts'
import { FormValues, StakingContractForm } from '~/staking/common'
import * as model from './staking-create.model'

export type StakingCreateProps = {
  className?: string
}

export const StakingCreate: React.VFC<StakingCreateProps> = () => {
  const params = useParams<{ protocolId: string }>()
  const queryParams = useQueryParams()

  const loading = useStore(model.stakingCreateFx.pending)

  const handleCreate = (formValues: FormValues) => {
    model.stakingCreateFx({
      protocol: params.protocolId,
      input: formValues,
    })
  }

  const adapterKeys = useStore(model.$adapterKeys)

  useGate(model.StakingCreateGate, queryParams.get('protocol-adapter'))

  return (
    <AppLayout>
      <StakingContractForm
        loading={loading}
        onSubmit={handleCreate}
        layouts={adapterKeys.layouts}
        automates={adapterKeys.automates}
      />
    </AppLayout>
  )
}
