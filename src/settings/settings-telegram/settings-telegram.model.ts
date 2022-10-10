import { sample, createEvent, createEffect } from 'effector'

import * as contactListModel from '~/settings/settings-contacts/settings-contact.model'
import { UserContactBrokerEnum } from '~/api/_generated-types'
import { config } from '~/config'

export const { createUserContactFx } = contactListModel

export const openTelegram = createEvent<unknown>()

export const openTelegramFx = createEffect(
  async (userContact: { confirmationCode: string }) => {
    window.open(
      `https://t.me/${config.TELEGRAM_BOT_USERNAME}?start=${userContact.confirmationCode}`,
      '_blank'
    )
  }
)

sample({
  clock: openTelegram,
  fn: () => ({
    broker: UserContactBrokerEnum.Telegram,
    address: '',
    name: '',
  }),
  target: createUserContactFx,
})

sample({
  clock: createUserContactFx.doneData,
  target: openTelegramFx,
})
