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
      <Typography className={styles.title}>Auth</Typography>
      <Typography variant="body2" className={styles.subtitle}>
        Auth
      </Typography>
      <Button className={styles.button} onClick={props.onConfirm}>
        Got it
      </Button>
    </Dialog>
  )
}
