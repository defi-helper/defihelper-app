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
      <Typography variant="body2" className={styles.title}>
        Please note that DFH is at the MVP stage. Only the basic set of
        functionality is currently available, including portfolio management,
        notifications, automations, and auto-staking. In Q1 2022, the
        development team will expand the functionality of the service and
        expects to connect at least 100 more protocols.
      </Typography>
      <Typography variant="body2" className={styles.title}>
        If you want to propose a new feature or a new protocol to support, do
        not hesitate to create a proposal in the &apos;Vote&apos; section.
      </Typography>
      <Button onClick={props.onConfirm} className={styles.button} size="small">
        Continue
      </Button>
    </Dialog>
  )
}
