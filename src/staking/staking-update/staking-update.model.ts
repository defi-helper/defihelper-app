import { createDomain } from 'effector-logger/macro'

import { history } from '~/common/history'
import { StakingContractUpdateMutationVariables } from '~/graphql/_generated-types'
import { toastsService } from '~/toasts'
import { paths } from '~/paths'
import { stakingApi } from '~/staking/common'

const stakingUpdate = createDomain()

export const contractUpdate = async (
  input: StakingContractUpdateMutationVariables
) => {
  const data = await stakingApi.contractUpdate(input)

  if (!data) throw new Error('something went wrong')

  return data
}

export const stakingUpdateFx = stakingUpdate.createEffect(contractUpdate)

stakingUpdateFx.doneData.watch((payload) => {
  history.push(paths.protocols.detail(payload.protocolId))
})

toastsService.forwardErrors(stakingUpdateFx.failData)
