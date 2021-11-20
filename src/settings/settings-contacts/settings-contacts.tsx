import { useGate, useStore } from 'effector-react'
import { useMedia } from 'react-use'

import { Button } from '~/common/button'
import { Typography } from '~/common/typography'
import { Carousel } from '~/common/carousel'
import {
  SettingsHeader,
  SettingsContactFormDialog,
  SettingsContactCard,
  SettingsPaper,
  SettingsInitialCard,
  SettingsConfirmDialog,
  SettingsSuccessDialog,
} from '~/settings/common'
import { useDialog } from '~/common/dialog'
import { userModel } from '~/users'
import { Loader } from '~/common/loader'
import * as model from './settings-contact.model'
import * as styles from './settings-contacts.css'
import { Paper } from '~/common/paper'

export type SettingsContactsProps = {
  className?: string
}

const Grid: React.FC = (props) => {
  const isDesktop = useMedia('(min-width: 960px)')

  return isDesktop ? (
    <div className={styles.list}>{props.children}</div>
  ) : (
    <Carousel className={styles.carousel}>{props.children}</Carousel>
  )
}

export const SettingsContacts: React.VFC<SettingsContactsProps> = (props) => {
  const [openContactForm] = useDialog(SettingsContactFormDialog)
  const [openConfirm] = useDialog(SettingsConfirmDialog)
  const [openSuccess] = useDialog(SettingsSuccessDialog)

  const user = useStore(userModel.$user)

  const loading = useStore(model.fetchUserContactListFx.pending)
  const contactList = useStore(model.$userContactList)
  const contactCreating = useStore(model.createUserContactFx.pending)

  useGate(model.SettingsContactsGate)

  const handleOpenContactForm = async () => {
    try {
      if (!user) return

      const result = await openContactForm()

      const data = await model.createUserContactFx(result)

      await openSuccess({
        type: result.broker,
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

  const paperCount = (contactList.length ? 3 : 2) - contactList.length

  return (
    <div className={props.className}>
      <SettingsHeader className={styles.header}>
        <Typography variant="h3">Contacts</Typography>
        <Button
          color="blue"
          onClick={handleOpenContactForm}
          loading={contactCreating}
          className={styles.addButton}
        >
          +
          <Typography variant="inherit" className={styles.addButtonTitle}>
            New Contact
          </Typography>
        </Button>
      </SettingsHeader>
      <Grid>
        {loading && (
          <Paper radius={8} className={styles.loader}>
            <Loader height="36" />
          </Paper>
        )}
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
              status={contact.status}
              onEdit={handleUpdateContact(contact)}
              onDelete={handleDeleteContact(contact)}
            />
          ))}
        {!loading &&
          paperCount > 0 &&
          Array.from(Array(paperCount)).map((_, index) => (
            <SettingsPaper key={String(index)} />
          ))}
      </Grid>
    </div>
  )
}
