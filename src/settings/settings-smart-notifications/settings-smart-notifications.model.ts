import { createDomain, sample } from 'effector'
import { createGate } from 'effector-react'

import { settingsApi } from '~/settings/common'
import {
  UserNotificationTypeFragment,
  UserNotificationTypeEnum,
} from '~/api/_generated-types'
import { authModel } from '~/auth'

export const settingsNotificationsDomain = createDomain()

export const fetchUserNotificationsListFx =
  settingsNotificationsDomain.createEffect(() =>
    settingsApi.userNotificationsList()
  )

export const toggleUserNotificationFx =
  settingsNotificationsDomain.createEffect(
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

export const $userNotificationsList = settingsNotificationsDomain
  .createStore<UserNotificationTypeFragment[]>([])
  .on(fetchUserNotificationsListFx.doneData, (_, payload) => payload)
  .on(toggleUserNotificationFx.done, (state, { params }) =>
    params.state
      ? [...state, { type: params.type }]
      : state.filter(({ type }) => type !== params.type)
  )
  .reset(authModel.logoutFx)

export const SettingsNotificationsGate = createGate({
  domain: settingsNotificationsDomain,
  name: 'SettingsNotificationsGate',
})

sample({
  clock: [SettingsNotificationsGate.open],
  target: fetchUserNotificationsListFx,
})
