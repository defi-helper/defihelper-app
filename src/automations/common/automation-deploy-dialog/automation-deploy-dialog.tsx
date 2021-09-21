import { Dialog } from '~/common/dialog'

export type AutomationDeployDialogProps = {
  onConfirm: () => void
  onCancel: () => void
}

export const AutomationDeployDialog: React.VFC<AutomationDeployDialogProps> =
  () => {
    return <Dialog>test</Dialog>
  }
