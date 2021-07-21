import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { userContactApi } from '~/user-contacts/common'
import {
  UserContactCreateMutationVariables,
  UserContactEmailConfirmMutationVariables,
  UserContactFragmentFragment
} from '~/graphql/_generated-types'

const userContactListDomain = createDomain('userContactList')

export const fetchUserContactListFx = userContactListDomain.createEffect({
  name: 'fetchUserContactListFx',
  handler: () => userContactApi.userContactList({})
})

export const createUserContactFx = userContactListDomain.createEffect({
  name: 'createUserContactFx',
  handler: async (input: UserContactCreateMutationVariables['input']) => {
    const contract = await userContactApi.userContactCreate({ input })

    if (contract) {
      return contract
    }

    throw new Error('Not created')
  }
})

export const confirmEmailFx = userContactListDomain.createEffect({
  name: 'confirmEmailFx',
  handler: async (input: UserContactEmailConfirmMutationVariables['input']) => {
    return !!(await userContactApi.userContactConfirmEmail({ input }))
  }
})

export const deleteUserContactFx = userContactListDomain.createEffect({
  name: 'deleteUserContactFx',
  handler: async (id: string) => {
    const isDeleted = await userContactApi.userContactDelete({
      id
    })

    if (isDeleted) {
      return id
    }

    throw new Error('Not deleted')
  }
})

export const $userContactList = userContactListDomain
  .createStore<(UserContactFragmentFragment & { deleting: boolean })[]>([], {
    name: '$userContactList'
  })
  .on(fetchUserContactListFx.doneData, (_, payload) =>
    payload.map((contact) => ({
      ...contact,
      deleting: false
    }))
  )
  .on(createUserContactFx.doneData, (state, payload) => {
    if (state.find((c) => c.id === payload.id)) {
      return state
    }

    return [
      ...state,
      {
        ...payload,
        deleting: false
      }
    ]
  })
  .on(deleteUserContactFx, (state, payload) =>
    state.map((userContact) =>
      userContact.id === payload
        ? { ...userContact, deleting: true }
        : userContact
    )
  )
  .on(deleteUserContactFx.done, (state, { params: payload }) =>
    state.filter(({ id }) => id !== payload)
  )

export const UserContactListGate = createGate({
  domain: userContactListDomain
})

sample({
  source: [UserContactListGate.status],
  clock: [UserContactListGate.open],
  fn: () => {},
  target: fetchUserContactListFx,
  greedy: true
})
