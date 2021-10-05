import { Typography } from '~/common/typography'
import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import * as styles from './confirm-dialog.css'

export type ConfirmDialogProps = {
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog: React.VFC<ConfirmDialogProps> = (props) => {
  return (
    <Dialog className={styles.root}>
      <Typography className={styles.title}>Are you sure?</Typography>
      <div className={styles.buttons}>
        <Button onClick={() => props.onConfirm()} color="red" size="small">
          yes
        </Button>
        <Button
          onClick={() => props.onCancel()}
          variant="outlined"
          size="small"
        >
          cancel
        </Button>
      </div>
    </Dialog>
  )
}
