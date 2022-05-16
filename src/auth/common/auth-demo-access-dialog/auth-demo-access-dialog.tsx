import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import * as styles from './auth-demo-access-dialog.css'

export type AuthDemoAccessDialogProps = {
  onCancel: () => void
  onConfirm: () => void
  logOut: () => void
}

export const AuthDemoAccessDialog: React.VFC<AuthDemoAccessDialogProps> = (
  props
) => {
  return (
    <Dialog className={styles.root}>
      <Typography variant="body2" weight="semibold" className={styles.title}>
        You are in demo accout
      </Typography>
      <Typography variant="body2" className={styles.body}>
        To make any operations you have to connect your wallet. You can do it
        right now or continue exploring the DeFiHelper in simulation mode.
      </Typography>

      <div className={styles.buttonGroup}>
        <Button
          variant="outlined"
          onClick={() => props.onCancel()}
          className={styles.stayInSimulation}
        >
          stay in simulation
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            props.onConfirm()
            props.logOut()
          }}
        >
          connect wallet
        </Button>
      </div>
    </Dialog>
  )
}
