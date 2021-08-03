import { createDomain } from 'effector-logger'

import { history } from '~/common/history'
import { StakingContractUpdateMutationVariables } from '~/graphql/_generated-types'
import { toastsService } from '~/toasts'
import { paths } from '~/paths'
import { stakingApi } from '~/staking/common'

const stakingUpdate = createDomain('stakingUpdate')

export const stakingUpdateFx = stakingUpdate.createEffect({
  name: 'stakingUpdateFx',
  handler: (input: StakingContractUpdateMutationVariables) =>
    stakingApi.contractUpdate(input),
})

stakingUpdateFx.doneData.watch((payload) => {
  if (!payload) return

  history.push(paths.protocols.detail(payload))
})

toastsService.forwardErrors(stakingUpdateFx.failData)
