import { createDomain } from 'effector-logger'
import { history } from '~/common/history'

import { StakingContractCreateMutationVariables } from '~/graphql/_generated-types'
import { toastsService } from '~/toasts'
import { paths } from '~/paths'
import { stakingApi } from '~/staking/common'

const stakingCreate = createDomain('stakingCreate')

export const stakingCreateFx = stakingCreate.createEffect({
  name: 'stakingCreateFx',
  handler: (input: StakingContractCreateMutationVariables) =>
    stakingApi.contractCreate(input),
})

stakingCreateFx.doneData.watch((payload) => {
  history.push(paths.protocols.detail(payload))
})

toastsService.forwardErrors(stakingCreateFx.failData)
