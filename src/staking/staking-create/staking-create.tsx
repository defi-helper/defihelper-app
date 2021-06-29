import { useParams } from 'react-router-dom'

import { MainLayout } from '~/layouts'
import { StakingForm } from '~/staking/common'
import * as model from './staking-create.model'

export type StakingCreateProps = {
  className?: string
}

export const StakingCreate: React.VFC<StakingCreateProps> = () => {
  const params = useParams<{ protocolId: string }>()

  return (
    <MainLayout>
      <StakingForm
        loading={false}
        onSubmit={(formValues) =>
          model.stakingCreateFx({
            protocol: params.protocolId,
            input: formValues
          })
        }
      />
    </MainLayout>
  )
}
