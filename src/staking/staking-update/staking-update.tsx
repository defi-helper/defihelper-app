import { useParams } from 'react-router-dom'
import { useGate, useStoreMap } from 'effector-react'

import { MainLayout } from '~/layouts'
import { StakingForm } from '~/staking/common'
import * as model from './staking-update.model'
import * as stakingListModel from '~/staking/staking-list/staking-list.model'

export const StakingUpdate: React.VFC<unknown> = () => {
  const params = useParams<{
    protocolId: string
    stakingId: string
  }>()

  const staking = useStoreMap({
    store: stakingListModel.$contracts,
    keys: [params.stakingId],
    fn: (contracts, [stakingId]) =>
      contracts.find(({ id }) => id === stakingId) ?? null
  })

  useGate(stakingListModel.Gate, params.protocolId)

  const defaultValues = staking
    ? {
        blockchain: staking.blockchain,
        network: staking.network,
        address: staking.address,
        name: staking.name,
        description: staking.description,
        link: staking.link,
        hidden: staking.hidden,
        adapter: staking.adapter
      }
    : undefined

  return (
    <MainLayout>
      <StakingForm
        loading={false}
        defaultValues={defaultValues}
        onSubmit={(formValues) =>
          model.stakingUpdateFx({ id: params.stakingId, input: formValues })
        }
      />
    </MainLayout>
  )
}
