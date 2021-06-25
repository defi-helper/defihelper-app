import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { Portal } from '~/common/portal'
import { $notifications, removeNotification } from './notifications.model'

export type NotificationsProviderProps = {
  maxItems?: number
}

const DURATION = 6000

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    right: 10,
    top: 10,
    zIndex: 10000,

    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  },

  notification: {
    position: 'static',
    left: 'auto',
    transform: 'none',
    justifyContent: 'flex-end'
  }
}))

export const NotificationsProvider: React.FC<NotificationsProviderProps> = (
  props
) => {
  const notifications = useStore($notifications)

  const classes = useStyles()

  const handleClose = (key: string) => () => {
    removeNotification(key)
  }

  useEffect(() => {
    if (props.maxItems && notifications.length > props.maxItems) {
      removeNotification(notifications[0].key)
    }
  }, [notifications, props.maxItems])

  return (
    <>
      <Portal>
        <div className={classes.root}>
          {notifications.map((notification) => {
            const isDefault = notification.variant === 'default'

            return (
              <Snackbar
                open
                autoHideDuration={DURATION}
                key={notification.key}
                message={isDefault ? notification.message : undefined}
                className={classes.notification}
                ClickAwayListenerProps={{ onClickAway: () => {} }}
                onClick={handleClose(notification.key)}
                onClose={handleClose(notification.key)}
              >
                {!isDefault ? (
                  <Alert
                    onClose={handleClose(notification.key)}
                    variant="filled"
                    severity={
                      notification.variant === 'default'
                        ? undefined
                        : notification.variant
                    }
                    elevation={6}
                  >
                    {notification.message}
                  </Alert>
                ) : undefined}
              </Snackbar>
            )
          })}
        </div>
      </Portal>
      {props.children}
    </>
  )
}
