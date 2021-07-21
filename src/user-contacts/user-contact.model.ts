import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { userContactApi } from '~/user-contacts/common'
import {
  UserContactCreateMutationVariables,
  UserContactEmailConfirmMutationVariables,
  UserContactFragmentFragment
} from '~/graphql/_generated-types'

const userContactListDomain = createDomain('userContactList')
const emailConfirmationDomain = createDomain('emailConfirmation')

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
    if (state.some((c) => c.id === payload.id)) {
      return
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
  clock: [UserContactListGate.open],
  target: fetchUserContactListFx,
  greedy: true
})

export const confirmEmailFx = emailConfirmationDomain.createEffect({
  name: 'confirmEmailFx',
  handler: async (input: UserContactEmailConfirmMutationVariables['input']) => {
    return !!(await userContactApi.userContactConfirmEmail({ input }))
  }
})

export const $confirmEmail = emailConfirmationDomain
  .createStore<{ code: string; status: boolean | undefined }[]>([], {
    name: '$confirmEmail'
  })
  .on(confirmEmailFx, (state, payload) => {
    if (
      state.some(
        (confirmation) => confirmation.code === payload.confirmationCode
      )
    ) {
      return
    }

    return [...state, { code: payload.confirmationCode, status: undefined }]
  })
  .on(confirmEmailFx.done, (state, payload) => {
    const confirmation = state.find(
      (c) => c.code === payload.params.confirmationCode
    )
    if (confirmation) {
      confirmation.status = payload.result
    }
    return [...state]
  })
