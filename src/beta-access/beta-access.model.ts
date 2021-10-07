import { sample, createDomain, attach } from 'effector-logger/macro'

import * as contactListModel from '~/settings/settings-contacts/settings-contact.model'

import { UserContactBrokerEnum } from '~/graphql/_generated-types'
import { config } from '~/config'

const betaAccessDomain = createDomain('betaAccess')

const createUserContactFx = attach({
  effect: contactListModel.createUserContactFx,
})

export const openTelegram = betaAccessDomain.createEvent('openTelegram')

export const openTelegramFx = betaAccessDomain.createEffect({
  name: 'openTelegramFx',
  handler: async (userContact: {
    broker: UserContactBrokerEnum
    confirmationCode: string
  }) => {
    window.open(
      `https://t.me/${config.TELEGRAM_BOT_USERNAME}?start=${userContact.confirmationCode}`,
      '_blank'
    )
  },
})

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
