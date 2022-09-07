import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import * as styles from './governance-attention-dialog.css'

export type GovernanceAttentionDialogProps = {
  onCancel: () => void
}

export const GovernanceAttentionDialog: React.VFC<GovernanceAttentionDialogProps> =
  (props) => {
    return (
      <Dialog className={styles.root}>
        <Typography>
          Your current voting power is 0 votes. Please check the wallet address
          and that you have delegated your votes to the right address (need to
          do only once).
        </Typography>
        <Button onClick={props.onCancel} className={styles.button}>
          OK
        </Button>
      </Dialog>
    )
  }
