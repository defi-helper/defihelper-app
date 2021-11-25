import { useEffect, useMemo } from 'react'
import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { BrowserRouter as Router } from 'react-router-dom'
import isEmpty from 'lodash.isempty'

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
import {
  UserContactBrokerEnum,
  UserContactStatusEnum,
  UserRoleEnum,
} from '~/graphql/_generated-types'
import { Head } from '~/common/head'
import { cutAccount } from '~/common/cut-account'
import { networksConfig } from '~/networks-config'
import { SubscribeAttention } from './common/subscribe-attention'
import * as contactListModel from '~/settings/settings-contacts/settings-contact.model'
import * as walletListModel from '~/settings/settings-wallets/settings-wallets.model'
import * as styles from './beta-access.css'
import * as model from './beta-access.model'

export type BetaAccessProps = unknown

export const BetaAccess: React.VFC<BetaAccessProps> = () => {
  const user = useStore(authModel.$user)
  const userContact = useStore(model.$userContact)
  const userContacts = useStore(contactListModel.$userContactList)
  const wallets = useStore(walletListModel.$wallets)

  const [openWalletList] = useDialog(WalletList)
  const [openSuccess] = useDialog(BetaAccessSuccess)
  const [openSubscribe] = useDialog(SubscribeAttention)

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

  const contacts = useMemo(
    () => (userContact ? [...userContacts, userContact] : userContacts),
    [userContact, userContacts]
  )

  useEffect(() => {
    const telegram = contacts.find(
      (contact) => contact.broker === UserContactBrokerEnum.Telegram
    )

    if (
      telegram?.status === UserContactStatusEnum.Inactive &&
      user &&
      config.BETA &&
      user.role === UserRoleEnum.Candidate
    ) {
      openSubscribe()
        .then(() => {
          model.openTelegramFx(telegram)
        })
        .catch((error) => console.error(error.message))
    }

    if (
      user &&
      !contacts.length &&
      config.BETA &&
      user.role === UserRoleEnum.Candidate
    ) {
      openSubscribe()
        .then(() => {
          model.openTelegram()
        })
        .catch((error) => console.error(error.message))
    }

    if (
      telegram?.status === UserContactStatusEnum.Active &&
      user &&
      config.BETA &&
      user.role === UserRoleEnum.Candidate
    ) {
      openSuccess().catch((error) => console.error(error.message))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts, user])

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
                <div>
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
                  {!isEmpty(wallets) && (
                    <div className={styles.wallets}>
                      {wallets.map((wallet) => (
                        <Typography variant="body3" key={wallet.id}>
                          {cutAccount(wallet.address)}{' '}
                          {networksConfig[wallet.network] && (
                            <>({networksConfig[wallet.network].title})</>
                          )}
                        </Typography>
                      ))}
                    </div>
                  )}
                </div>
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
