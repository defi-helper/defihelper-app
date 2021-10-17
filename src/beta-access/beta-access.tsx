import { useEffect } from 'react'
import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

import { AppLayout } from '~/layouts'
import { Button } from '~/common/button'
import { useDialog } from '~/common/dialog'
import { Grid } from '~/common/grid'
import { Typography } from '~/common/typography'
import { WalletList } from '~/wallets/wallet-list'
import {
  walletNetworkModel,
  useEthereumNetwork,
} from '~/wallets/wallet-networks'
import { config } from '~/config'
import { Paper } from '~/common/paper'
import { userModel } from '~/users'
import { BetaAccessSuccess } from './common/wallet-success'
import { UserRoleEnum } from '~/graphql/_generated-types'
import * as contactListModel from '~/settings/settings-contacts/settings-contact.model'
import { Head } from '~/common/head'
import * as styles from './beta-access.css'
import * as model from './beta-access.model'

export type BetaAccessProps = unknown

export const BetaAccess: React.VFC<BetaAccessProps> = () => {
  useEthereumNetwork()

  const { account = null } = walletNetworkModel.useWalletNetwork()
  const user = useStore(userModel.$user)

  const [connected, setConnected] = useLocalStorage('connected', false)

  const [openWalletList] = useDialog(WalletList)
  const [openSuccess] = useDialog(BetaAccessSuccess)

  const handleOpenWalletList = async () => {
    try {
      const data = await openWalletList()

      walletNetworkModel.activateWalletFx({ connector: data.connector })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const contactList = useStore(contactListModel.$userContactList)

  useGate(contactListModel.SettingsContactsGate)

  useEffect(() => {
    if (
      user &&
      config.BETA &&
      user.role === UserRoleEnum.Candidate &&
      !connected
    ) {
      openSuccess()
        .then(() => setConnected(true))
        .catch(console.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, connected])

  return (
    <Router>
      <AppLayout>
        <Head title="Beta access" />
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
            DeFiHelper is in the final phase of development. Connect your
            wallet, subscribe to a Telegram bot, and be among the early
            adopters.
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
                  Connect your wallet and be among the first users of DFH
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
                  Subscribe to the DFH Telegram bot to be notified when Beta is
                  launched
                </Typography>
                {!contactList.length && (
                  <Button
                    variant="outlined"
                    onClick={() => model.openTelegram()}
                    disabled={!user}
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
