import { useGate, useStore } from 'effector-react'

import { Button } from '~/common/button'
import { Typography } from '~/common/typography'
import {
  SettingsHeader,
  SettingsContactFormDialog,
  SettingsContactCard,
} from '~/settings/common'
import { useDialog } from '~/common/dialog'
import { ConfirmDialog } from '~/common/confirm-dialog'
import * as model from './settings-contact.model'
import * as styles from './settings-contacts.css'

export type SettingsContactsProps = {
  className?: string
}

export const SettingsContacts: React.VFC<SettingsContactsProps> = (props) => {
  const [openContactForm] = useDialog(SettingsContactFormDialog)
  const [openConfirm] = useDialog(ConfirmDialog)

  const loading = useStore(model.fetchUserContactListFx.pending)
  const contactList = useStore(model.$userContactList)
  const contactCreating = useStore(model.createUserContactFx.pending)

  useGate(model.SettingsContactsGate)

  const handleOpenContactForm = async () => {
    try {
      const result = await openContactForm()

      model.createUserContactFx(result)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleDeleteContact = (contactId: string) => async () => {
    try {
      await openConfirm()

      model.deleteUserContactFx(contactId)
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
        {!loading && !contactList?.length && <>No contacts found</>}

        {!loading &&
          contactList &&
          contactList.map((contact) => (
            <SettingsContactCard
              address={contact.address}
              title={contact.name || contact.address || 'untitled'}
              key={contact.id}
              type={contact.broker}
              deleting={contact.deleting}
              editing={contact.editing}
              onEdit={handleUpdateContact(contact)}
              onDelete={handleDeleteContact(contact.id)}
            />
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
