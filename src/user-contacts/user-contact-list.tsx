import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
} from '@material-ui/core'
import { useGate, useStore } from 'effector-react'
import Button from '@material-ui/core/Button'

import { AppLayout } from '~/layouts'
import { useDialog } from '~/common/dialog'
import { ConfirmDialog } from '~/common/confirm-dialog'
import * as model from './user-contact.model'
import { UserContactAdd } from '~/user-contacts/user-contact-add'
import {
  UserContactBrokerEnum,
  UserContactStatusEnum,
} from '~/graphql/_generated-types'
import { config } from '~/config'

export type ContactListProps = unknown

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },

  link: {
    textDecoration: 'none',
    width: '100%',
  },

  item: {
    display: 'flex',
    marginBottom: 5,
    width: '100%',
  },

  telegramConfirm: {
    margin: '10px 15px',
  },

  card: {
    padding: '10px 15px',
    margin: '10px 15px',
    display: 'flex',
    alignItems: 'center',
  },

  tokens: {
    marginLeft: 'auto',
  },

  mr: {
    marginRight: 20,
  },
}))

export const UserContactList: React.VFC<ContactListProps> = () => {
  const classes = useStyles()

  const [openConfirm] = useDialog(ConfirmDialog)

  const loading = useStore(model.fetchUserContactListFx.pending)
  const contactList = useStore(model.$userContactList)

  const handleOpenConfirm = async (id: string) => {
    try {
      await openConfirm()

      await model.deleteUserContactFx(id)
    } catch (error) {
      console.error(error.message)
    }
  }

  useGate(model.UserContactListGate)

  return (
    <AppLayout>
      <Paper className={classes.card}>
        <UserContactAdd />
      </Paper>
      <List component="nav" aria-label="secondary mailbox folders">
        {loading && <Paper className={classes.card}>loading...</Paper>}
        {!loading && !contactList?.length && (
          <ListItem button>
            <ListItemText primary="No contacts found" />
          </ListItem>
        )}

        {!loading &&
          contactList &&
          contactList.map((contact) => (
            <ListItem button key={contact.id}>
              <ListItemText
                primary={contact.address}
                secondary={contact.broker}
              />
              <ListItemSecondaryAction>
                {contact.broker === UserContactBrokerEnum.Telegram &&
                contact.status === UserContactStatusEnum.Inactive ? (
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
                ) : null}

                <Button
                  variant="contained"
                  color="secondary"
                  disabled={contact.deleting}
                  onClick={() => handleOpenConfirm(contact.id)}
                >
                  Delete
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </AppLayout>
  )
}
