import { Typography } from '~/common/typography'
import { Button } from '~/common/button'
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
