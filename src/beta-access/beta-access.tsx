import { useEffect } from 'react'
import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { BrowserRouter as Router } from 'react-router-dom'

import { BetaLayout } from '~/layouts'
import { Button } from '~/common/button'
import { useDialog } from '~/common/dialog'
import { Grid } from '~/common/grid'
import { Typography } from '~/common/typography'
import { WalletList } from '~/wallets/wallet-list'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { config } from '~/config'
import { Paper } from '~/common/paper'
import { authModel } from '~/auth'
import { BetaAccessSuccess } from './common/wallet-success'
import { UserRoleEnum } from '~/graphql/_generated-types'
import { Head } from '~/common/head'
import * as contactListModel from '~/settings/settings-contacts/settings-contact.model'
import * as styles from './beta-access.css'
import * as model from './beta-access.model'

export type BetaAccessProps = unknown

export const BetaAccess: React.VFC<BetaAccessProps> = () => {
  const user = useStore(authModel.$user)
  const userContact = useStore(model.$userContact)
  const userContacts = useStore(contactListModel.$userContactList)

  const [openWalletList] = useDialog(WalletList)
  const [openSuccess] = useDialog(BetaAccessSuccess)

  const handleOpenWalletList = async () => {
    try {
      const data = await openWalletList()

      walletNetworkModel.activateWalletFx({
        connector: data.connector,
      })
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
      (userContact || userContacts.length) &&
      user &&
      config.BETA &&
      user.role === UserRoleEnum.Candidate
    ) {
      openSuccess().catch((error) => console.error(error.message))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userContact, userContacts])

  return (
    <Router>
      <BetaLayout>
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
            wallet, subscribe to the Telegram bot, and be among the early
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
                {Boolean(user) && (
                  <Typography
                    variant="body2"
                    transform="uppercase"
                    family="mono"
                    className={styles.connected}
                  >
                    Connected
                  </Typography>
                )}
                {!user ? (
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
      </BetaLayout>
    </Router>
  )
}
