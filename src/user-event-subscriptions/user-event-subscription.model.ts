import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { userEventSubscriptionApi } from '~/user-event-subscriptions/common'
import {
  UserEventSubscriptionCreateMutationVariables,
  UserEventSubscriptionFragmentFragment,
} from '~/graphql/_generated-types'

const userEventSubscriptionListDomain = createDomain(
  'userEventSubscriptionList'
)

export const fetchUserEventSubscriptionListFx =
  userEventSubscriptionListDomain.createEffect({
    name: 'fetchUserEventSubscriptionListFx',
    handler: () => userEventSubscriptionApi.userEventSubscriptionList({}),
  })

export const createUserEventSubscriptionFx =
  userEventSubscriptionListDomain.createEffect({
    name: 'createUserEventSubscriptionFx',
    handler: async (
      input: UserEventSubscriptionCreateMutationVariables['input']
    ) => {
      const contract =
        await userEventSubscriptionApi.userEventSubscriptionCreate({ input })

      if (contract) {
        return contract
      }

      throw new Error('Not created')
    },
  })

export const deleteUserEventSubscriptionFx =
  userEventSubscriptionListDomain.createEffect({
    name: 'deleteUserEventSubscriptionFx',
    handler: async (id: string) => {
      const isDeleted =
        await userEventSubscriptionApi.userEventSubscriptionDelete({
          id,
        })

      if (isDeleted) {
        return id
      }

      throw new Error('Not deleted')
    },
  })

export const $userEventSubscriptionList = userEventSubscriptionListDomain
  .createStore<
    (UserEventSubscriptionFragmentFragment & { deleting: boolean })[]
  >([], {
    name: '$userEventSubscriptionList',
  })
  .on(fetchUserEventSubscriptionListFx.doneData, (_, payload) =>
    payload.map((contact) => ({
      ...contact,
      deleting: false,
    }))
  )
  .on(createUserEventSubscriptionFx.doneData, (state, payload) => {
    if (state.some((c) => c.id === payload.id)) {
      return
    }

    return [
      ...state,
      {
        ...payload,
        deleting: false,
      },
    ]
  })
  .on(deleteUserEventSubscriptionFx, (state, payload) =>
    state.map((userEventSubscription) =>
      userEventSubscription.id === payload
        ? { ...userEventSubscription, deleting: true }
        : userEventSubscription
    )
  )
  .on(deleteUserEventSubscriptionFx.done, (state, { params: payload }) =>
    state.filter(({ id }) => id !== payload)
  )

export const UserEventSubscriptionListGate = createGate({
  domain: userEventSubscriptionListDomain,
})

sample({
  clock: [UserEventSubscriptionListGate.open],
  target: fetchUserEventSubscriptionListFx,
  greedy: true,
})
