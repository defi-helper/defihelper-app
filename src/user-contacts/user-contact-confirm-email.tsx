import { makeStyles, Paper } from '@material-ui/core'
import { useStore } from 'effector-react'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { AppLayout } from '~/layouts'
import * as model from './user-contact.model'

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

export const UserContactConfirmEmail: React.VFC<ContactListProps> = () => {
  const classes = useStyles()

  const params = useParams<{ confirmationCode: string }>()

  const confirmsEmail = useStore(model.$confirmEmail)
  const confirmEmail = confirmsEmail.find(
    (c) => c.code === params.confirmationCode
  )

  useEffect(() => {
    if (confirmEmail === undefined) {
      model.confirmEmailFx({
        confirmationCode: params.confirmationCode,
      })
    }
  }, [confirmEmail, params])

  const loading = useStore(model.confirmEmailFx.pending)

  return (
    <AppLayout>
      {loading && <Paper className={classes.card}>Confirming email...</Paper>}
      {!loading && confirmEmail && confirmEmail.status === true && (
        <Paper className={classes.card}>
          Email has been confirmed <InsertEmoticonIcon />
        </Paper>
      )}
      {!loading && confirmEmail && !confirmEmail.status && (
        <Paper className={classes.card}>
          Email has not been confirmed <SentimentVeryDissatisfiedIcon />
        </Paper>
      )}
    </AppLayout>
  )
}
