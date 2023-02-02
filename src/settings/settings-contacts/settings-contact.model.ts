import { createDomain, guard, sample, UnitValue } from 'effector'
import omit from 'lodash.omit'

import { settingsApi } from '~/settings/common'
import {
  UserContactCreateMutationVariables,
  UserContactFragmentFragment,
  UserNotificationTypeEnum,
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

export const replaceUserContact =
  settingsContactsDomain.createEvent<UserContactFragmentFragment>()

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
  .createStore<UnitValue<typeof fetchUserNotificationsListFx.doneData>>({})
  .on(fetchUserNotificationsListFx.doneData, (_, payload) => payload)
  .on(updateUserNotificationFx.done, (state, { params }) => {
    const hasContact = Boolean(state[params.contact])

    if (hasContact && !params.state) return omit(state, params.contact)

    return {
      ...state,
      [params.contact]: {
        type: params.type,
        time: params.hour,
        contact: params.contact,
      },
    }
  })
  .reset(authModel.logoutFx)

export const $userContactList = settingsContactsDomain
  .createStore<
    (UserContactFragmentFragment & { deleting?: boolean; editing?: boolean })[]
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
  .on(replaceUserContact, (state, payload) =>
    state.map((contact) => (contact.id === payload.id ? payload : contact))
  )
  .on(updateUserContactFx.doneData, (state, payload) =>
    state.map((contact) =>
      contact.id === payload.id
        ? { ...payload, editing: false, deleting: false }
        : contact
    )
  )
  .reset(authModel.logoutFx)

sample({
  clock: $userContactList.updates,
  target: fetchUserNotificationsListFx,
})

guard({
  source: [authModel.$userReady, authModel.$user],
  clock: [authModel.$userReady.updates, authModel.$user.updates],
  filter: ([userReady, user]) => userReady && Boolean(user),
  target: fetchUserContactListFx,
})
