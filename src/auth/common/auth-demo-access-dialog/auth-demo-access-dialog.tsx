import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import * as styles from './auth-demo-access-dialog.css'

export type AuthDemoAccessDialogProps = {
  onCancel: () => void
  onConfirm: () => void
}

export const AuthDemoAccessDialog: React.VFC<AuthDemoAccessDialogProps> = (
  props
) => {
  return (
    <Dialog className={styles.root}>
      <Typography variant="body2" weight="semibold" className={styles.title}>
        You are in simulation mode
      </Typography>
      <Typography variant="body2" className={styles.body}>
        You can&apos;t perform this operation in simulation mode. Please turn
        off the simulation mode first to proceed.
      </Typography>

      <div className={styles.buttonGroup}>
        <Button
          variant="outlined"
          onClick={() => props.onCancel()}
          className={styles.stayInSimulation}
        >
          stay in simulation
        </Button>
        <Button color="green" onClick={() => props.onConfirm()}>
          connect wallet
        </Button>
      </div>
    </Dialog>
  )
}
