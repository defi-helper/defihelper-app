import { useStore } from 'effector-react'

import { Dialog } from '~/common/dialog'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { cutAccount } from '~/common/cut-account'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { Link } from '~/common/link'
import { Button } from '~/common/button'
import * as styles from './wallet-detail.css'

export type WalletDetailProps = {
  onChange: () => void
  onCancel: () => void
}

export const WalletDetail: React.VFC<WalletDetailProps> = (props) => {
  const wallet = useStore(walletNetworkModel.$wallet)

  const handleLogout = async () => {
    try {
      await walletNetworkModel.diactivateWalletFx(wallet.connector)

      props.onCancel()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <Dialog className={styles.root}>
      {!!wallet.account && !!wallet.chainId && (
        <Link
          href={buildExplorerUrl({
            address: wallet.account,
            network: wallet.chainId,
          })}
          target="_blank"
        >
          {cutAccount(wallet.account)}
        </Link>
      )}
      <Button
        onClick={props.onChange}
        variant="outlined"
        className={styles.change}
      >
        Change Wallet
      </Button>
      <Button variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
    </Dialog>
  )
}
