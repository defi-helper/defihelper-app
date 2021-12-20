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
        Please note that DeFiHelper is at the MVP stage. Only the basic set of
        functionality is available at this point of launch, including
        cross-chain portfolio management, notifications, and automation. Over
        the course of the next month or two, the development team will expand
        the functionality of the service and expects to connect at least 100
        more protocols.
      </Typography>
      <Typography align="center" className={styles.title}>
        If you want to propose a new feature or a new protocol to support, do
        not hesitate to create a proposal.
      </Typography>
      <Button onClick={props.onConfirm} className={styles.button} size="small">
        START APP
      </Button>
    </Dialog>
  )
}
