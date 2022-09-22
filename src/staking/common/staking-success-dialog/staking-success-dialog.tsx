import { Dialog } from '~/common/dialog'
import { Button } from '~/common/button'
import { Typography } from '~/common/typography'
import * as styles from './staking-success-dialog.css'

const MESSAGES = {
  stake: 'Staked',
  unstake: 'Unstaked',
  claim: 'Claimed',
  buyLiquidity: 'Sold',
}

export type StakingSuccessDialogProps = {
  onConfirm: () => void
  onCancel: () => void
  type: keyof typeof MESSAGES
}

export const StakingSuccessDialog: React.VFC<StakingSuccessDialogProps> = (
  props
) => {
  return (
    <Dialog className={styles.root}>
      <Typography align="center" className={styles.title}>
        {MESSAGES[props.type]} successfully
      </Typography>
      <Button className={styles.button} onClick={props.onConfirm}>
        Continue
      </Button>
    </Dialog>
  )
}
