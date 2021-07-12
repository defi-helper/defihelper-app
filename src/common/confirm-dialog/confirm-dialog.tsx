import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { Dialog } from '~/common/dialog'

export type ConfirmDialogProps = {
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog: React.VFC<ConfirmDialogProps> = (props) => {
  return (
    <Dialog>
      <Typography>Are you sure?</Typography>
      <Button onClick={() => props.onConfirm()}>yes</Button>
      <Button onClick={() => props.onCancel()}>no</Button>
    </Dialog>
  )
}
