import { Typography } from '~/common/typography'
import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import * as styles from './stop-transaction-dialog.css'

export type StopTransactionDialogProps = {
  onConfirm?: () => void
  onCancel?: () => void
  title?: React.ReactNode
  actions?: React.ReactNode
}

export const StopTransactionDialog: React.VFC<StopTransactionDialogProps> = (
  props
) => {
  const {
    title = 'Please note that you need to begin the whole process from the start of you will close this page. Are you sure that you want to close this page?',
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
          no
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
