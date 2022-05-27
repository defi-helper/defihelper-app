import { Dialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import * as styles from './auth-sign-message-dialog.css'

export type AuthSignMessageDialogProps = {
  onConfirm: () => void
}

export const AuthSignMessageDialog: React.VFC<AuthSignMessageDialogProps> =
  () => {
    return (
      <Dialog className={styles.root}>
        <Typography variant="h4" className={styles.title}>
          Please verify your address
        </Typography>
        <Typography variant="body2">
          To secure your privacy, please sign the plain-text message proving
          that you are the owner of this address.
        </Typography>
      </Dialog>
    )
  }
