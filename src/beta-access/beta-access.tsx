import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { BrowserRouter as Router } from 'react-router-dom'

import { AppLayout } from '~/layouts'
import { Link } from '~/common/link'
import { Button } from '~/common/button'
import { useDialog } from '~/common/dialog'
import { Grid } from '~/common/grid'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { contactListModel } from '~/user-contacts'
import { WalletList } from '~/wallets/wallet-list'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { config } from '~/config'
import * as styles from './beta-access.css'
import * as model from './beta-access.model'

export type BetaAccessProps = unknown

export const BetaAccess: React.VFC<BetaAccessProps> = () => {
  const { account = null } = walletNetworkModel.useWalletNetwork()

  const [openWalletList] = useDialog(WalletList)

  const handleOpenWalletList = async () => {
    try {
      const connector = await openWalletList()

      walletNetworkModel.activateWalletFx({ connector })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const contactList = useStore(contactListModel.$userContactList)

  useGate(contactListModel.UserContactListGate)

  return (
    <Router>
      <AppLayout>
        <Grid.Container variant="md" className={styles.root}>
          <Typography
            variant="h2"
            family="mono"
            transform="uppercase"
            className={styles.title}
          >
            Get Beta Access
          </Typography>
          <Typography className={clsx(styles.subtitle, styles.grey)}>
            DeFiHelper is in the final phase of development. Be the first one to
            skyrocket your DeFi porfolio with early access.
          </Typography>
          <Grid.Row>
            <div className={styles.col}>
              <Paper className={styles.card}>
                <Typography
                  variant="h4"
                  family="mono"
                  transform="uppercase"
                  className={styles.cardTitle}
                >
                  1. CONNECT WALLET
                </Typography>
                <Typography
                  className={clsx(styles.grey, styles.cardSubtitle)}
                  variant="body2"
                >
                  Connect your wallet to start using your portfolio instantly
                  after launch
                </Typography>
                {account && (
                  <Typography
                    variant="body2"
                    transform="uppercase"
                    family="mono"
                    className={styles.connected}
                  >
                    Connected
                  </Typography>
                )}
                {!account ? (
                  <Button variant="outlined" onClick={handleOpenWalletList}>
                    Connect wallet
                  </Button>
                ) : (
                  <Button variant="outlined" onClick={handleOpenWalletList}>
                    Change
                  </Button>
                )}
              </Paper>
            </div>
            <div className={styles.col}>
              <Paper className={styles.card}>
                <Typography
                  variant="h4"
                  family="mono"
                  transform="uppercase"
                  className={styles.cardTitle}
                >
                  2. GET NOTIFIED
                </Typography>
                <Typography
                  className={clsx(styles.grey, styles.cardSubtitle)}
                  variant="body2"
                >
                  Subscribe for telegram bot to be notified when your portfolio
                  ready to use
                </Typography>
                {!contactList.length && (
                  <Button<typeof Link, HTMLAnchorElement>
                    variant="outlined"
                    onClick={() => model.openTelegram()}
                    as={Link}
                    target="_blank"
                    href={`https://t.me/${config.TELEGRAM_BOT_USERNAME}`}
                  >
                    Open Telegram
                  </Button>
                )}
                {!!contactList.length && (
                  <Typography
                    variant="body2"
                    transform="uppercase"
                    family="mono"
                    className={styles.connected}
                  >
                    Connected
                  </Typography>
                )}
              </Paper>
            </div>
          </Grid.Row>
        </Grid.Container>
      </AppLayout>
    </Router>
  )
}
