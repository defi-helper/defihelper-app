import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { StakingContractFragmentFragment } from '~/graphql/_generated-types'
import { stakingApi } from '../common'

export const stakingListDomain = createDomain('stakingList')

export const fetchStakingListFx = stakingListDomain.createEffect({
  name: 'fetchStakingList',
  handler: async (id: string) => stakingApi.contractList({ filter: { id } })
})

const ERROR = 'Not deleted'

export const deleteStakingFx = stakingListDomain.createEffect({
  name: 'deleteStaking',
  handler: async (id: string) => {
    const isDeleted = await stakingApi.contractDelete(id)

    if (isDeleted) {
      return id
    }

    throw new Error(ERROR)
  }
})

export const $stakingList = stakingListDomain
  .createStore<StakingContractFragmentFragment[]>([], {
    name: 'protocols'
  })
  .on(fetchStakingListFx.doneData, (_, payload) => payload)
  .on(deleteStakingFx.doneData, (state, payload) => {
    return state.filter(({ id }) => id !== payload)
  })

export const Gate = createGate<string>({
  domain: stakingListDomain
})

sample({
  clock: Gate.open,
  target: fetchStakingListFx
})
