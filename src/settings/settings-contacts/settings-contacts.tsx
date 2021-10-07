import { useGate, useStore } from 'effector-react'

import { Button } from '~/common/button'
import { Typography } from '~/common/typography'
import {
  SettingsHeader,
  SettingsContactFormDialog,
  SettingsContactCard,
  SettingsPaper,
  SettingsInitialCard,
  SettingsConfirmDialog,
} from '~/settings/common'
import { useDialog } from '~/common/dialog'
import * as model from './settings-contact.model'
import * as styles from './settings-contacts.css'
import { userModel } from '~/users'

export type SettingsContactsProps = {
  className?: string
}

export const SettingsContacts: React.VFC<SettingsContactsProps> = (props) => {
  const [openContactForm] = useDialog(SettingsContactFormDialog)
  const [openConfirm] = useDialog(SettingsConfirmDialog)

  const user = useStore(userModel.$user)

  const loading = useStore(model.fetchUserContactListFx.pending)
  const contactList = useStore(model.$userContactList)
  const contactCreating = useStore(model.createUserContactFx.pending)

  useGate(model.SettingsContactsGate)

  const handleOpenContactForm = async () => {
    try {
      if (!user) return

      const result = await openContactForm()

      model.createUserContactFx(result)
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

  const paperCount = (contactList.length ? 3 : 2) - contactList.length

  return (
    <div className={props.className}>
      <SettingsHeader className={styles.header}>
        <Typography variant="h3">Contacts</Typography>
        <Button
          color="blue"
          onClick={handleOpenContactForm}
          loading={contactCreating}
        >
          + New Contact
        </Button>
      </SettingsHeader>
      <div className={styles.list}>
        {loading && <>loading...</>}
        {!loading && !contactList.length && (
          <SettingsInitialCard>
            <Typography variant="body2">
              Add contact so you can recieve notifications about any actions.
            </Typography>
            <Button onClick={handleOpenContactForm} size="small">
              + Add Contact
            </Button>
          </SettingsInitialCard>
        )}
        {!loading &&
          Boolean(contactList.length) &&
          contactList.map((contact) => (
            <SettingsContactCard
              address={contact.address}
              title={contact.name || contact.address || 'untitled'}
              key={contact.id}
              type={contact.broker}
              deleting={contact.deleting}
              editing={contact.editing}
              onEdit={handleUpdateContact(contact)}
              onDelete={handleDeleteContact(contact)}
            />
          ))}
        {!loading &&
          paperCount > 0 &&
          Array.from(Array(paperCount)).map((_, index) => (
            <SettingsPaper key={String(index)} />
          ))}
      </div>
    </div>
  )
}

/* <ListItemText
    primary={contact.address}
    secondary={contact.broker}
  />
  <ListItemSecondaryAction>
    {contact.broker === UserContactBrokerEnum.Telegram &&
    contact.status === UserContactStatusEnum.Inactive && (
      <Button
        variant="contained"
        color="primary"
        className={classes.telegramConfirm}
        disabled={contact.deleting}
        target="_blank"
        href={`https://t.me/${config.TELEGRAM_BOT_USERNAME}?start=${contact.confirmationCode}`}
      >
        Confirm
      </Button>
    )}

  <Button
    variant="contained"
    color="secondary"
    disabled={contact.deleting}
    onClick={() => handleOpenConfirm(contact.id)}
  >
    Delete
  </Button>
</ListItemSecondaryAction> */
