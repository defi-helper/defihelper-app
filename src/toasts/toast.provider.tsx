import { useStore } from 'effector-react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { Portal } from '~/common/portal'
import * as model from './toast.model'

export type ToastProviderProps = {
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
      marginTop: theme.spacing(2),
    },
  },

  toast: {
    position: 'static',
    left: 'auto',
    transform: 'none',
    justifyContent: 'flex-end',
  },
}))

export const ToastProvider: React.FC<ToastProviderProps> = (props) => {
  const toasts = useStore(model.$toasts)

  const classes = useStyles()

  const handleClose = (key: string) => () => {
    model.removeToast(key)
  }

  return (
    <>
      {Boolean(toasts.length) && (
        <Portal>
          <div className={classes.root}>
            {toasts.slice(0, props.maxItems).map((toast) => {
              const isDefault = toast.variant === 'default'

              return (
                <Snackbar
                  open
                  autoHideDuration={DURATION}
                  key={toast.key}
                  message={isDefault ? toast.message : undefined}
                  className={classes.toast}
                  ClickAwayListenerProps={{ onClickAway: () => {} }}
                  onClick={handleClose(toast.key)}
                  onClose={handleClose(toast.key)}
                >
                  {!isDefault ? (
                    <Alert
                      onClose={handleClose(toast.key)}
                      variant="filled"
                      severity={
                        toast.variant === 'default' ? undefined : toast.variant
                      }
                      elevation={6}
                    >
                      {toast.message}
                    </Alert>
                  ) : undefined}
                </Snackbar>
              )
            })}
          </div>
        </Portal>
      )}
      {props.children}
    </>
  )
}
