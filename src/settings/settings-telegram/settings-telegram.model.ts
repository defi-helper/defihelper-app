import { sample, createDomain, attach, restore } from 'effector-logger/macro'

import * as contactListModel from '~/settings/settings-contacts/settings-contact.model'
import { UserContactBrokerEnum } from '~/graphql/_generated-types'
import { config } from '~/config'

const betaAccessDomain = createDomain()

export const createUserContactFx = attach({
  effect: contactListModel.createUserContactFx,
})

export const openTelegram = betaAccessDomain.createEvent<unknown>()

export const openTelegramFx = betaAccessDomain.createEffect(
  async (userContact: { confirmationCode: string }) => {
    window.open(
      `https://t.me/${config.TELEGRAM_BOT_USERNAME}?start=${userContact.confirmationCode}`,
      '_blank'
    )
  }
)

export const $userContact = restore(createUserContactFx.doneData, null)

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
