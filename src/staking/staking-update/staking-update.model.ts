import { createDomain } from 'effector-logger'
import { history } from '~/common/history'

import { StakingContractUpdateMutationVariables } from '~/graphql/_generated-types'
import { notifications } from '~/notifications'
import { paths } from '~/paths'
import { stakingApi } from '~/staking/common'

const stakingUpdate = createDomain('stakingUpdate')

export const stakingUpdateFx = stakingUpdate.createEffect({
  name: 'stakingUpdateFx',
  handler: (input: StakingContractUpdateMutationVariables) =>
    stakingApi.contractUpdate(input)
})

stakingUpdateFx.failData.watch((error) => notifications.error(error.message))

stakingUpdateFx.doneData.watch((payload) => {
  history.push(paths.protocols.detail(payload))
})
