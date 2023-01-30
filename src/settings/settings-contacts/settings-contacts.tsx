import { useStore } from 'effector-react'

import { Typography } from '~/common/typography'
import {
  SettingsHeader,
  SettingsContactFormDialog,
  SettingsContactCard,
  SettingsPaper,
  SettingsConfirmDialog,
  SettingsSuccessDialog,
  SettingsGrid,
} from '~/settings/common'
import { useDialog } from '~/common/dialog'
import { authModel } from '~/auth'
import * as model from './settings-contact.model'
import * as telegramModel from '~/settings/settings-telegram/settings-telegram.model'
import * as styles from './settings-contacts.css'
import {
  UserContactBrokerEnum,
  UserContactStatusEnum,
  UserNotificationTypeEnum,
} from '~/api/_generated-types'
import { analytics } from '~/analytics'

export type SettingsContactsProps = {
  className?: string
  withHeader?: boolean
}

export const SettingsContacts: React.VFC<SettingsContactsProps> = (props) => {
  const [openContactForm] = useDialog(SettingsContactFormDialog)
  const [openConfirm] = useDialog(SettingsConfirmDialog)
  const [openSuccess] = useDialog(SettingsSuccessDialog)

  const user = useStore(authModel.$user)
  const contactList = useStore(model.$userContactList)
  const contactCreating = useStore(model.createUserContactFx.pending)
  const creatingParams = useStore(model.$creatingUserParams)
  const notificationsList = useStore(model.$userNotificationsList)

  const { withHeader = true } = props

  const handleOpenContactForm = (broker: UserContactBrokerEnum) => async () => {
    try {
      if (!user) return

      if (broker === UserContactBrokerEnum.Telegram) {
        const data = await model.createUserContactFx({
          address: '',
          broker,
          name: 'telegram',
        })

        await openSuccess({
          type: broker,
          confirmationCode: data.confirmationCode,
        })

        analytics.log('settings_email_connect_click')
      } else {
        const result = await openContactForm({
          defaultValues: {
            broker,
          },
        })
        analytics.log('settings_email_save_click')

        const data = await model.createUserContactFx({
          ...result,
          broker,
          name: result.address ?? 'email',
        })

        await openSuccess({
          type: broker,
          confirmationCode: data.confirmationCode,
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleDeleteContact =
    (contact: typeof contactList[number]) => async () => {
      try {
        await openConfirm({
          name: contact.name,
        })

        model.deleteUserContactFx(contact.id)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

  const handleUpdateNotification = async (
    { id: contact }: typeof contactList[number],
    type: UserNotificationTypeEnum,
    state: boolean,
    hour: number
  ) => {
    try {
      await model.updateUserNotificationFx({
        type,
        state,
        hour,
        contact,
      })
      analytics.onNotificationsEnabled()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const contactsMap = contactList.reduce((acc, contact) => {
    acc.set(contact.broker, contact)

    return acc
  }, new Map<UserContactBrokerEnum, typeof contactList[number]>())

  const telegram = contactsMap.get(UserContactBrokerEnum.Telegram)
  const email = contactsMap.get(UserContactBrokerEnum.Email)

  const handleContinueConnect = () => {
    if (!telegram?.confirmationCode) return

    telegramModel.openTelegramFx({
      confirmationCode: telegram.confirmationCode,
    })
  }

  return (
    <div className={props.className}>
      {withHeader && (
        <SettingsHeader className={styles.header}>
          <Typography variant="h3">Contacts</Typography>
        </SettingsHeader>
      )}
      <SettingsGrid>
        <SettingsContactCard
          isConnected={Boolean(telegram?.address)}
          address={telegram?.address}
          currentTimezone={user?.timezone ?? 'UTC'}
          title="Telegram notifications settings"
          type={UserContactBrokerEnum.Telegram}
          loading={
            telegram?.editing ||
            telegram?.deleting ||
            (contactCreating &&
              creatingParams?.broker === UserContactBrokerEnum.Telegram)
          }
          status={telegram?.status}
          onContinueConnect={handleContinueConnect}
          onConnect={handleOpenContactForm(UserContactBrokerEnum.Telegram)}
          onDisconnect={telegram ? handleDeleteContact(telegram) : undefined}
          notification={
            telegram?.id ? notificationsList[telegram.id] : undefined
          }
          onUpdateNotification={(hour: number) =>
            telegram
              ? handleUpdateNotification(
                  telegram,
                  UserNotificationTypeEnum.PortfolioMetrics,
                  telegram.status === UserContactStatusEnum.Active,
                  hour
                )
              : undefined
          }
          onToggleNotification={(state: boolean, hour: number) =>
            telegram
              ? handleUpdateNotification(
                  telegram,
                  UserNotificationTypeEnum.PortfolioMetrics,
                  state,
                  hour
                )
              : undefined
          }
        />
        <SettingsContactCard
          isConnected={Boolean(email)}
          address={email?.address}
          title="Email notifications settings"
          type={UserContactBrokerEnum.Email}
          currentTimezone={user?.timezone ?? 'UTC'}
          loading={
            email?.editing ||
            email?.deleting ||
            (contactCreating &&
              creatingParams?.broker === UserContactBrokerEnum.Email)
          }
          status={email?.status}
          notification={email ? notificationsList[email.id] : undefined}
          onUpdateNotification={(hour: number) =>
            email
              ? handleUpdateNotification(
                  email,
                  UserNotificationTypeEnum.PortfolioMetrics,
                  email.status === UserContactStatusEnum.Active,
                  hour
                )
              : undefined
          }
          onToggleNotification={(state: boolean, hour: number) =>
            email
              ? handleUpdateNotification(
                  email,
                  UserNotificationTypeEnum.PortfolioMetrics,
                  state,
                  hour
                )
              : undefined
          }
          onConnect={handleOpenContactForm(UserContactBrokerEnum.Email)}
          onDisconnect={email ? handleDeleteContact(email) : undefined}
        />
        <SettingsPaper />
      </SettingsGrid>
    </div>
  )
}
