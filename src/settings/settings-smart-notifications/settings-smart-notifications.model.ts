import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import { settingsApi } from '~/settings/common'
import {
  UserEnabledNotificationTypeFragment,
  UserNotificationTypeEnum,
} from '~/graphql/_generated-types'
import { authModel } from '~/auth'

export const settingsNotificationsDomain = createDomain()

export const fetchUserNotificationsListFx =
  settingsNotificationsDomain.createEffect(() =>
    settingsApi.userEnabledNotificationsList()
  )

export const disableUserNotificationFx =
  settingsNotificationsDomain.createEffect(
    async (type: UserNotificationTypeEnum) => {
      const isDisabled = await settingsApi.userNotificationDisable({ type })

      if (isDisabled) {
        return true
      }

      throw new Error('Not disabled')
    }
  )

export const enableUserNotificationFx =
  settingsNotificationsDomain.createEffect(
    async (type: UserNotificationTypeEnum) => {
      const isEnabled = await settingsApi.userNotificationEnable({ type })

      if (isEnabled) {
        return true
      }

      throw new Error('Not enabled')
    }
  )

export const $userNotificationsList = settingsNotificationsDomain
  .createStore<UserEnabledNotificationTypeFragment[]>([])
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
