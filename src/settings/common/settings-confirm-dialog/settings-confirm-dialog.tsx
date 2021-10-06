import { Button } from '~/common/button'
import { ConfirmDialog } from '~/common/confirm-dialog'
import { Typography } from '~/common/typography'
import * as styles from './settings-confirm-dialog.css'

export type ConfirmDialogProps = {
  onConfirm: () => void
  onCancel: () => void
  name: string
}

export const SettingsConfirmDialog: React.VFC<ConfirmDialogProps> = (props) => {
  return (
    <ConfirmDialog
      title={
        <>
          Are you shure you want to delete{' '}
          <Typography variant="inherit" className={styles.name}>
            {props.name}
          </Typography>
          ?{' '}
        </>
      }
      actions={
        <>
          <Button onClick={() => props.onConfirm()} color="red" size="small">
            Yes, Delete
          </Button>
          <Button
            onClick={() => props.onCancel()}
            variant="outlined"
            size="small"
          >
            cancel
          </Button>
        </>
      }
    />
  )
}
