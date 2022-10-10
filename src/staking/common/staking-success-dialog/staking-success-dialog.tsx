import { Dialog } from '~/common/dialog'
import { Button } from '~/common/button'
import { Typography } from '~/common/typography'
import * as styles from './staking-success-dialog.css'

export type StakingSuccessDialogProps = {
  onConfirm: () => void
  onCancel: () => void
}

export const StakingSuccessDialog: React.VFC<StakingSuccessDialogProps> = (
  props
) => {
  return (
    <Dialog className={styles.root}>
      <Typography align="center" className={styles.title}>
        Transaction completed
      </Typography>
      <Button className={styles.button} onClick={props.onConfirm}>
        Continue
      </Button>
    </Dialog>
  )
}
