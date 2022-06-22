import { createDomain, guard, UnitValue } from 'effector'
import { createGate } from 'effector-react'

import { settingsApi } from '~/settings/common'
import {
  UserContactCreateMutationVariables,
  UserContactFragmentFragment,
  UserNotificationTypeEnum,
  UserNotificationTypeFragment,
} from '~/api/_generated-types'
import * as authModel from '~/auth/auth.model'

export const settingsContactsDomain = createDomain()

export const fetchUserContactListFx = settingsContactsDomain.createEffect(() =>
  settingsApi.userContactList({})
)

export const fetchUserNotificationsListFx = settingsContactsDomain.createEffect(
  () => settingsApi.userNotificationsList()
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

export const $creatingUserParams = settingsContactsDomain
  .createStore<UnitValue<typeof createUserContactFx> | null>(null)
  .on(createUserContactFx, (_, payload) => payload)
  .reset(createUserContactFx.finally)

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

export const toggleUserNotificationFx = settingsContactsDomain.createEffect(
  async (params: {
    contact: string
    hour: number
    type: UserNotificationTypeEnum
    state: boolean
  }) => {
    const { type, state, contact, hour } = params
    const isDone = await settingsApi.userNotificationToggle({
      type,
      state,
      contact,
      hour,
    })

    if (isDone) {
      return isDone
    }

    throw new Error('Unable to toggle')
  }
)

export const updateUserNotificationFx = settingsContactsDomain.createEffect(
  async (params: {
    contact: string
    hour: number
    type: UserNotificationTypeEnum
    state: boolean
  }) => {
    const { type, state, contact, hour } = params
    const isDone = await settingsApi.userNotificationToggle({
      type,
      state,
      contact,
      hour,
    })

    if (isDone) {
      return isDone
    }

    throw new Error('Unable to toggle')
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

export const $userNotificationsList = settingsContactsDomain
  .createStore<UserNotificationTypeFragment[]>([])
  .on(fetchUserNotificationsListFx.doneData, (_, payload) => payload)
  .on(updateUserNotificationFx.done, (state, { params }) => {
    return state.map((existingNotification) =>
      existingNotification.type === params.type &&
      params.contact === existingNotification.contact
        ? { ...existingNotification, time: params.hour }
        : existingNotification
    )
  })
  .on(toggleUserNotificationFx.done, (state, { params }) => {
    return params.state
      ? [
          ...state,
          { type: params.type, time: params.hour, contact: params.contact },
        ]
      : state.filter(
          ({ type, contact }) =>
            type !== params.type && params.contact === contact
        )
  })
  .reset(authModel.logoutFx)

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
  .reset(authModel.logoutFx)

export const SettingsContactsGate = createGate({
  domain: settingsContactsDomain,
  name: 'SettingsContactsGate',
})

guard({
  source: [authModel.$userReady, authModel.$user],
  clock: [SettingsContactsGate.open, authModel.$userReady.updates],
  filter: ([userReady, user]) => userReady && Boolean(user),
  target: [fetchUserContactListFx, fetchUserNotificationsListFx],
})
