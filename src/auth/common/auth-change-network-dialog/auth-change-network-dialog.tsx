import MetamaskScreen from 'src/assets/images/metamask-screen.png'
import { Dialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import * as styles from './auth-change-network-dialog.css'

export type AuthChangeNetworkDialogProps = {
  onConfirm: () => void
}

export const AuthChangeNetworkDialog: React.VFC<AuthChangeNetworkDialogProps> =
  () => {
    return (
      <Dialog className={styles.root}>
        <Typography variant="h4" className={styles.title}>
          Switch network manually in your Wallet
        </Typography>
        <img src={MetamaskScreen} alt="" className={styles.img} />
      </Dialog>
    )
  }
