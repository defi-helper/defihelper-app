import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { settingsApi } from '~/settings/common'
import {
  UserContactCreateMutationVariables,
  UserContactFragmentFragment,
} from '~/graphql/_generated-types'
import { authModel } from '~/auth'

export const settingsContactsDomain = createDomain()

export const fetchUserContactListFx = settingsContactsDomain.createEffect(() =>
  settingsApi.userContactList({})
)

export const createUserContactFx = settingsContactsDomain.createEffect(
  async (input: UserContactCreateMutationVariables['input']) => {
    const contract = await settingsApi.userContactCreate({ input })

    if (contract) {
      return contract
    }

    throw new Error('Not created')
  }
)

export const updateUserContactFx = settingsContactsDomain.createEffect(
  async (params: { id: string; name: string }) => {
    const contract = await settingsApi.userContactUpdate({
      id: params.id,
      input: {
        name: params.name,
      },
    })

    if (contract) {
      return contract
    }

    throw new Error('Not updated')
  }
)

export const deleteUserContactFx = settingsContactsDomain.createEffect(
  async (id: string) => {
    const isDeleted = await settingsApi.userContactDelete({
      id,
    })

    if (isDeleted) {
      return id
    }

    throw new Error('Not deleted')
  }
)

export const $userContactList = settingsContactsDomain
  .createStore<
    (UserContactFragmentFragment & { deleting: boolean; editing: boolean })[]
  >([])
  .on(fetchUserContactListFx.doneData, (_, payload) =>
    payload.map((contact) => ({
      ...contact,
      deleting: false,
      editing: false,
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
        deleting: false,
        editing: false,
      },
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
  .on(updateUserContactFx, (state, payload) =>
    state.map((contact) =>
      contact.id === payload.id ? { ...contact, editing: true } : contact
    )
  )
  .on(updateUserContactFx.doneData, (state, payload) =>
    state.map((contact) =>
      contact.id === payload.id
        ? { ...payload, editing: false, deleting: false }
        : contact
    )
  )
  .reset(authModel.logoutFx.done)

export const SettingsContactsGate = createGate({
  domain: settingsContactsDomain,
  name: 'SettingsContactsGate',
})

sample({
  clock: [SettingsContactsGate.open],
  target: fetchUserContactListFx,
})
