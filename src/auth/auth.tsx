import clsx from 'clsx'

import { AppLayout } from '~/layouts/app-layout'
import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { useWalletList } from '~/wallets/wallet-list'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { toastsService } from '~/toasts'
import * as styles from './auth.css'

export type AuthProps = {
  className?: string
}

export const Auth: React.VFC<AuthProps> = (props) => {
  const [openWalletList] = useWalletList()

  const handleConnect = async () => {
    try {
      const wallet = await openWalletList()

      if (!wallet.account) return

      walletNetworkModel.activateWalletFx({
        connector: wallet.connector,
      })
    } catch (error) {
      if (error instanceof Error) {
        toastsService.error(error.message)
      }
    }
  }

  return (
    <AppLayout>
      <div className={clsx(styles.root, props.className)}>
        <Typography
          family="mono"
          transform="uppercase"
          className={styles.title}
        >
          Setup your Portfolio
        </Typography>
        <Typography className={styles.subtitle}>
          Connect your wallet first to track your funds cross-chain and automate
          actions in various scenarios. You will be able to change it any time
          in settings.
        </Typography>
        <div className={styles.list}>
          <Paper radius={8} className={styles.connect}>
            <Button onClick={handleConnect}>+ Connect Wallet</Button>
          </Paper>
          <Paper radius={8} className={styles.paper} />
          <Paper radius={8} className={styles.paper} />
        </div>
      </div>
    </AppLayout>
  )
}
