import clsx from 'clsx'

import { AppLayout } from '~/layouts/app-layout'
import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { useWalletList } from '~/wallets/wallet-list'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { toastsService } from '~/toasts'
import { Head } from '~/common/head'
import { useDialog } from '~/common/dialog'
import { AuthChangeNetworkDialog } from './common'
import { UnsupportedChainError } from '~/wallets/common/unsupported-chain'
import * as styles from './auth.css'
import { AuthSignMessageDialog } from './common/auth-sign-message-dialog'

export type AuthProps = {
  className?: string
}

export const Auth: React.VFC<AuthProps> = (props) => {
  const [openWalletList] = useWalletList()
  const [openChangeNetworkDialog] = useDialog(AuthChangeNetworkDialog)
  const [openSignMessageDialog, closeSignMessageDialog] = useDialog(
    AuthSignMessageDialog
  )

  const handleConnect = async () => {
    try {
      const wallet = await openWalletList()

      if (!wallet.account) return

      walletNetworkModel
        .activateWalletFx({
          connector: wallet.connector,
        })
        .then(() => openSignMessageDialog().catch(() => {}))
    } catch (error) {
      closeSignMessageDialog()
      if (error instanceof UnsupportedChainError) {
        openChangeNetworkDialog().catch((err) => console.error(err.message))

        return
      }

      if (error instanceof Error) {
        toastsService.error(error.message)
      }
    }
  }

  return (
    <AppLayout>
      <Head title="Autopilot for your DeFi portfolio" />
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
