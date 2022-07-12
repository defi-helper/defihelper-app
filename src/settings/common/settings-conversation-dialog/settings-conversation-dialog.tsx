import { Dialog } from '~/common/dialog'
import * as styles from './settings-conversation-dialog.css'

export type SettingsConversationDialogProps = unknown

export const SettingsConversationDialog: React.VFC<SettingsConversationDialogProps> =
  () => {
    return (
      <Dialog className={styles.root}>
        Please do not forget to push the START button in telegram bot
      </Dialog>
    )
  }
