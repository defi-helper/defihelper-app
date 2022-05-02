import { createDomain, sample } from 'effector-logger/macro'
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
    async (params: { type: UserNotificationTypeEnum; state: boolean }) => {
      const isDone = await settingsApi.userNotificationToggle({
        type: params.type,
        state: params.state,
      })

      if (isDone) {
        return
      }

      throw new Error('Unable to toggle')
    }
  )

export const $userNotificationsList = settingsNotificationsDomain
  .createStore<UserNotificationTypeFragment[]>([])
  .on(fetchUserNotificationsListFx.doneData, (_, payload) => payload)
  .reset(authModel.logoutFx.done)

export const SettingsNotificationsGate = createGate({
  domain: settingsNotificationsDomain,
  name: 'SettingsNotificationsGate',
})

sample({
  clock: [SettingsNotificationsGate.open],
  target: fetchUserNotificationsListFx,
})
