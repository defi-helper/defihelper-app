import clsx from 'clsx'

import { AppLayout } from '~/layouts/app-layout'
import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { useWalletList } from '~/wallets/wallet-list'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { toastsService } from '~/toasts'
import { UserRejectionError } from '~/common/dialog'
import * as styles from './setup-layout.css'

export type SetupLayoutProps = {
  className?: string
}

export const SetupLayout: React.VFC<SetupLayoutProps> = (props) => {
  const [openWalletList] = useWalletList()

  const handleConnect = async () => {
    try {
      const wallet = await openWalletList()

      if (!wallet.account) return

      walletNetworkModel.signMessage({
        chainId: String(wallet.chainId),
        provider: wallet.provider,
        account: wallet.account,
      })
    } catch (error) {
      if (error instanceof UserRejectionError) {
        console.error(error.message)

        return
      }

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
          To track your funds cross-chain and automate actions in various
          scenarios connect your wallets first. You will be able to change it
          any time in settings.
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
