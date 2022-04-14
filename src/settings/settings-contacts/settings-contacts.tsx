/* eslint-disable no-unused-vars */
import { useGate, useStore } from 'effector-react'

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
import * as styles from './settings-contacts.css'
import { UserContactBrokerEnum } from '~/graphql/_generated-types'

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

  useGate(model.SettingsContactsGate)

  const { withHeader = true } = props

  const handleOpenContactForm = (broker: UserContactBrokerEnum) => async () => {
    try {
      if (!user) return

      const result = await openContactForm({
        defaultValues: {
          broker,
        },
      })

      const data = await model.createUserContactFx(result)

      await openSuccess({
        type: broker,
        confirmationCode: data.confirmationCode,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleDeleteContact =
    (contact: typeof contactList[number]) => async () => {
      try {
        await openConfirm({ name: contact.name })

        model.deleteUserContactFx(contact.id)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

  const handleUpdateContact =
    (contact: typeof contactList[number]) => async () => {
      try {
        const defaultValues = {
          name: contact.name,
          address: contact.address,
          broker: contact.broker,
        }

        const result = await openContactForm({ defaultValues })

        model.updateUserContactFx({
          id: contact.id,
          name: result.name,
        })
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

  return (
    <div className={props.className}>
      {withHeader && (
        <SettingsHeader className={styles.header}>
          <Typography variant="h3">Contacts</Typography>
        </SettingsHeader>
      )}
      <SettingsGrid>
        <SettingsContactCard
          address={telegram?.address}
          title={telegram?.name || telegram?.address || 'Telegram'}
          type={UserContactBrokerEnum.Telegram}
          loading={
            telegram?.editing ||
            telegram?.deleting ||
            (contactCreating &&
              creatingParams?.broker === UserContactBrokerEnum.Telegram)
          }
          status={telegram?.status}
          onEdit={
            telegram
              ? handleUpdateContact(telegram)
              : handleOpenContactForm(UserContactBrokerEnum.Telegram)
          }
          onDelete={telegram ? handleDeleteContact(telegram) : undefined}
        />
        <SettingsContactCard
          address={email?.address}
          title={email?.name || email?.address || 'Email'}
          type={UserContactBrokerEnum.Email}
          loading={
            email?.editing ||
            email?.deleting ||
            (contactCreating &&
              creatingParams?.broker === UserContactBrokerEnum.Email)
          }
          status={email?.status}
          onEdit={
            email
              ? handleUpdateContact(email)
              : handleOpenContactForm(UserContactBrokerEnum.Email)
          }
          onDelete={email ? handleDeleteContact(email) : undefined}
        />
        <SettingsPaper />
      </SettingsGrid>
    </div>
  )
}
