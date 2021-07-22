import { useParams } from 'react-router-dom'

import { MainLayout } from '~/layouts'
import { FormValues, StakingContractForm } from '~/staking/common'
import * as model from './staking-create.model'

export type StakingCreateProps = {
  className?: string
}

export const StakingCreate: React.VFC<StakingCreateProps> = () => {
  const params = useParams<{ protocolId: string }>()

  const handleCreate = (formValues: FormValues) => {
    model.stakingCreateFx({
      protocol: params.protocolId,
      input: formValues,
    })
  }

  return (
    <MainLayout>
      <StakingContractForm loading={false} onSubmit={handleCreate} />
    </MainLayout>
  )
}
