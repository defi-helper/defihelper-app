import { sample, createDomain } from 'effector-logger'

import { contactListModel } from '~/user-contacts'
import { UserContactBrokerEnum } from '~/graphql/_generated-types'
import { config } from '~/config'

const betaAccessDomain = createDomain('betaAccess')

export const openTelegram = betaAccessDomain.createEvent('openTelegram')

export const openTelegramFx = betaAccessDomain.createEffect({
  name: 'openTelegramFx',
  handler: async (userContact: { confirmationCode: string }) => {
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
  }),
  target: contactListModel.createUserContactFx,
})

sample({
  clock: contactListModel.createUserContactFx.doneData,
  target: openTelegramFx,
})
