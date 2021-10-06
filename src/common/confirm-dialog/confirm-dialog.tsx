import { Typography } from '~/common/typography'
import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import * as styles from './confirm-dialog.css'

export type ConfirmDialogProps = {
  onConfirm?: () => void
  onCancel?: () => void
  title?: React.ReactNode
  actions?: React.ReactNode
}

export const ConfirmDialog: React.VFC<ConfirmDialogProps> = (props) => {
  const {
    title = 'Are you sure?',
    actions = (
      <>
        <Button onClick={() => props.onConfirm?.()} color="red" size="small">
          yes
        </Button>
        <Button
          onClick={() => props.onCancel?.()}
          variant="outlined"
          size="small"
        >
          cancel
        </Button>
      </>
    ),
  } = props

  return (
    <Dialog className={styles.root}>
      <Typography className={styles.title}>{title}</Typography>
      <div className={styles.buttons}>{actions}</div>
    </Dialog>
  )
}
