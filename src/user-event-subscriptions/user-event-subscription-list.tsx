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

import { MainLayout } from '~/layouts'
import { useDialog } from '~/common/dialog'
import { ConfirmDialog } from '~/common/confirm-dialog'
import * as model from './user-event-subscription.model'
import { UserEventSubscriptionAdd } from '~/user-event-subscriptions/user-event-subscription-add'

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

export const UserEventSubscriptionList: React.VFC<ContactListProps> = () => {
  const classes = useStyles()

  const [openConfirm] = useDialog(ConfirmDialog)

  const loading = useStore(model.fetchUserEventSubscriptionListFx.pending)
  const subscriptionList = useStore(model.$userEventSubscriptionList)

  const handleOpenConfirm = async (id: string) => {
    try {
      await openConfirm()

      await model.deleteUserEventSubscriptionFx(id)
    } catch (error) {
      console.error(error.message)
    }
  }

  useGate(model.UserEventSubscriptionListGate)

  return (
    <MainLayout>
      <Paper className={classes.card}>
        <UserEventSubscriptionAdd />
      </Paper>
      <List component="nav" aria-label="secondary mailbox folders">
        {loading && <Paper className={classes.card}>loading...</Paper>}
        {!loading && !subscriptionList?.length && (
          <ListItem button>
            <ListItemText primary="No subscriptions found" />
          </ListItem>
        )}

        {!loading &&
          subscriptionList &&
          subscriptionList.map((contact) => (
            <ListItem button key={contact.id}>
              <ListItemText
                primary={`${contact.event} in ${contact.contract.name}`}
                secondary={`on ${contact.contract.blockchain}${
                  contact.contract.network
                    ? `(network ${contact.contract.network})`
                    : ''
                }`}
              />
              <ListItemSecondaryAction>
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
    </MainLayout>
  )
}
