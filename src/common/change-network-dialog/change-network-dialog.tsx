import Typography from '@material-ui/core/Typography'

import { Dialog } from '~/common/dialog'

export type ChangeNetworkDialogProps = {
  onConfirm: () => void
  onCancel: () => void
}

export const ChangeNetworkDialog: React.VFC<ChangeNetworkDialogProps> = () => {
  return (
    <Dialog>
      <Typography>Choose mainnet on Metamask</Typography>
    </Dialog>
  )
}
