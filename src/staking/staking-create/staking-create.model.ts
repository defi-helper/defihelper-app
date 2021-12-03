import { createDomain, guard } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { history } from '~/common/history'
import { StakingContractCreateMutationVariables } from '~/graphql/_generated-types'
import { toastsService } from '~/toasts'
import { paths } from '~/paths'
import { buildAdaptersUrl, stakingApi } from '~/staking/common'
import { loadAdapter } from '~/common/load-adapter'

const stakingCreateDomain = createDomain('stakingCreate')

export const stakingCreateFx = stakingCreateDomain.createEffect(
  (input: StakingContractCreateMutationVariables) =>
    stakingApi.contractCreate(input)
)

const fetchAdapterKeysFx = stakingCreateDomain.createEffect(
  (protocolAdapter: string) =>
    loadAdapter(buildAdaptersUrl(protocolAdapter)).then((staking) =>
      Object.keys(staking)
    )
)

export const $adapterKeys = stakingCreateDomain
  .createStore<string[]>([])
  .on(fetchAdapterKeysFx.doneData, (_, payload) => payload)

export const StakingCreateGate = createGate<string | null>({
  domain: stakingCreateDomain,
  name: 'StakingCreateGate',
})

guard({
  clock: StakingCreateGate.open,
  filter: (clock): clock is string => Boolean(clock),
  target: fetchAdapterKeysFx,
})

stakingCreateFx.doneData.watch((payload) => {
  if (!payload) return

  history.push(paths.protocols.detail(payload))
})

toastsService.forwardErrors(stakingCreateFx.failData)
