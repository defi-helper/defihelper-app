import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import * as styles from './roadmap-success-dialog.css'

export type RoadmapSuccessDialogProps = {
  onCancel: () => void
  onConfirm: () => void
}

export const RoadmapSuccessDialog: React.VFC<RoadmapSuccessDialogProps> = (
  props
) => {
  return (
    <Dialog className={styles.root}>
      <Typography className={styles.title}>Thanks for proposal</Typography>
      <Typography variant="body2" className={styles.subtitle}>
        We will validate your proposal and it will be added in «Planned» list.
      </Typography>
      <Button className={styles.button} onClick={props.onConfirm}>
        Got it
      </Button>
    </Dialog>
  )
}
