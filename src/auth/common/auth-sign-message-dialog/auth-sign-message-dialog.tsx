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
          To ensure the security of your privacy, please sign this simple
          plain-text message to prove you&apos;re the owner of this address.
          (Nothing more. No risk for your asset at all.)
        </Typography>
      </Dialog>
    )
  }
