import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import * as styles from './roadmap-attention-dialog.css'

export type RoadmapAttentionDialogProps = {
  onCancel: () => void
  onConfirm: () => void
}

export const RoadmapAttentionDialog: React.VFC<RoadmapAttentionDialogProps> = (
  props
) => {
  return (
    <Dialog className={styles.root}>
      <Typography className={styles.title}>
        Only one proposal per day
      </Typography>
      <Typography variant="body2" className={styles.subtitle}>
        Thanks for your activity in participating in DFH future! Each user can
        create only one proposal per day, so please try tommorow.
      </Typography>
      <Button className={styles.button} onClick={props.onConfirm}>
        Got it
      </Button>
    </Dialog>
  )
}
