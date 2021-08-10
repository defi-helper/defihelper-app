import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { BrowserRouter as Router } from 'react-router-dom'

import { Link } from '~/common/link'
import { Button } from '~/common/button'
import { useDialog } from '~/common/dialog'
import { Grid } from '~/common/grid'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import { contactListModel } from '~/user-contacts'
import { WalletDetail } from '~/wallets/wallet-detail'
import { WalletList } from '~/wallets/wallet-list'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as styles from './beta-access.css'
import * as model from './beta-access.model'
import { config } from '~/config'

export type BetaAccessProps = unknown

export const BetaAccess: React.VFC<BetaAccessProps> = () => {
  const { account = null } = walletNetworkModel.useWalletNetwork()

  const [openWalletList, closeWalletList] = useDialog(WalletList)
  const [openChangeWallet] = useDialog(WalletDetail)

  const handleOpenWalletList = () =>
    openWalletList({ onClick: closeWalletList }).catch((error: Error) =>
      console.error(error.message)
    )

  const handleChangeWallet = () =>
    openChangeWallet({ onChange: handleOpenWalletList }).catch((error: Error) =>
      console.error(error.message)
    )

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
                  <Button variant="outlined" onClick={handleChangeWallet}>
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
                <Button
                  variant="outlined"
                  disabled={!account}
                  onClick={
                    !contactList.length ? () => model.openTelegram() : undefined
                  }
                  as={contactList.length ? Link : undefined}
                  target={contactList.length ? '_blank' : undefined}
                  href={
                    contactList.length
                      ? `https://t.me/${config.TELEGRAM_BOT_USERNAME}`
                      : undefined
                  }
                >
                  Open Telegram
                </Button>
              </Paper>
            </div>
          </Grid.Row>
        </Grid.Container>
      </AppLayout>
    </Router>
  )
}
