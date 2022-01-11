import { useParams } from 'react-router-dom'
import { useGate, useStore, useStoreMap } from 'effector-react'

import { AppLayout } from '~/layouts'
import { StakingContractForm, FormValues } from '~/staking/common'
import * as model from './staking-update.model'
import * as stakingListModel from '~/staking/staking-list/staking-list.model'
import { useQueryParams } from '~/common/hooks'
import { stakingCreateModel } from '../staking-create'

export const StakingUpdate: React.VFC<unknown> = () => {
  const params = useParams<{
    protocolId: string
    stakingId: string
  }>()
  const queryParams = useQueryParams()

  const staking = useStoreMap({
    store: stakingListModel.$contractList,
    keys: [params.stakingId],
    fn: (contracts, [stakingId]) =>
      contracts.find(({ id }) => id === stakingId) ?? null,
  })

  const loading = useStore(model.stakingUpdateFx.pending)

  const adapterKeys = useStore(stakingCreateModel.$adapterKeys)

  useGate(stakingListModel.StakingListGate, { ...params, hidden: null })
  useGate(
    stakingCreateModel.StakingCreateGate,
    queryParams.get('protocol-adapter')
  )

  const defaultValues = staking
    ? {
        blockchain: staking.blockchain,
        network: staking.network,
        address: staking.address,
        name: staking.name,
        description: staking.description,
        link: staking.link,
        hidden: staking.hidden,
        adapter: staking.adapter,
        layout: staking.layout,
        automates: staking.automate.adapters,
        autorestakeAdapter: staking.automate.autorestake ?? undefined,
      }
    : undefined

  const handleUpdate = (formValues: FormValues) => {
    model.stakingUpdateFx({ id: params.stakingId, input: formValues })
  }

  return (
    <AppLayout>
      <StakingContractForm
        loading={loading}
        defaultValues={defaultValues}
        layouts={adapterKeys.layouts}
        automates={adapterKeys.automates}
        onSubmit={handleUpdate}
      />
    </AppLayout>
  )
}
