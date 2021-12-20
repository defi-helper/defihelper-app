import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import * as styles from './auth-beta-dialog.css'

export type AuthBetaDialogProps = {
  onCancel: () => void
  onConfirm: () => void
}

export const AuthBetaDialog: React.VFC<AuthBetaDialogProps> = (props) => {
  return (
    <Dialog className={styles.root}>
      <Typography align="center" className={styles.title}>
        Text
      </Typography>
      <Button onClick={props.onConfirm} className={styles.button} size="small">
        Ok
      </Button>
    </Dialog>
  )
}
