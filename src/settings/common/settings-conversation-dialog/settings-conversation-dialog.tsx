import { Dialog } from '~/common/dialog'
import * as styles from './settings-conversation-dialog.css'

export type SettingsConversationDialogProps = unknown

export const SettingsConversationDialog: React.VFC<SettingsConversationDialogProps> =
  () => {
    return (
      <Dialog className={styles.root}>
        please, continue the conversation with bot
      </Dialog>
    )
  }
