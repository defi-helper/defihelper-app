import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import * as styles from './subscribe-attention.css'

export const SubscribeAttention: React.VFC<{ onConfirm: () => void }> = (
  props
) => {
  return (
    <Dialog className={styles.root}>
      <Typography align="center" className={styles.title}>
        Please subscribe to the DFH Telegram bot to be notified when Beta is
        launched
      </Typography>
      <Button onClick={props.onConfirm} className={styles.button} size="small">
        Open telegram
      </Button>
    </Dialog>
  )
}
