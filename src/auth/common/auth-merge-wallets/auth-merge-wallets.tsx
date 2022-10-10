import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import * as styles from './auth-merge-wallets.css'

export type AuthMergeWalletsProps = {
  onCancel: () => void
  onConfirm: () => void
}

export const AuthMergeWallets: React.VFC<AuthMergeWalletsProps> = (props) => {
  return (
    <Dialog className={styles.root}>
      <div className={styles.text}>
        <Typography variant="body2" as="div">
          Account already exists! Do you want to merge them? You will need to
          sign the transaction to prove the ownership of the address.
        </Typography>
      </div>
      <div className={styles.actions}>
        <Button onClick={props.onCancel}>Cancel</Button>
        <Button onClick={props.onConfirm} color="red" variant="outlined">
          Merge
        </Button>
      </div>
    </Dialog>
  )
}
