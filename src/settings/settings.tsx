import { useStore } from 'effector-react'
import { useEffect } from 'react'

import { AppLayout } from '~/layouts'
import { SettingsContacts } from './settings-contacts'
import { SettingsWallets } from './settings-wallets'
import { Head } from '~/common/head'
import { SettingsTransactionHistory } from './settings-transaction-history'
import { StakingAutomates } from '~/staking/staking-automates'
import { SettingsIntegrations } from '~/settings/settings-integrations'
import { Typography } from '~/common/typography'
import { Button } from '~/common/button'
import { authModel } from '~/auth'
import { Paper } from '~/common/paper'
import { Icon } from '~/common/icon'
import { pluralize } from '~/common/pluralize'
import { WalletConnect } from '~/wallets/wallet-connect'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { useDialog } from '~/common/dialog'
import { analytics } from '~/analytics'
import { bignumberUtils } from '~/common/bignumber-utils'
import { AutomationProducts } from '~/automations/automation-products'
import * as styles from './settings.css'
import * as model from './settings.model'

export type SettingsProps = unknown

export const Settings: React.VFC<SettingsProps> = () => {
  const [openAutomationProducts] = useDialog(AutomationProducts)
  const balanceLoading = useStore(model.fetchBalanceFx.pending)
  const balance = useStore(model.$balance)
  const wallet = walletNetworkModel.useWalletNetwork()

  const handleLogout = () => {
    authModel.logoutFx()
  }

  const handleBuyProducts = async () => {
    if (!wallet?.account) return
    analytics.log('automations_buy_click')

    try {
      await openAutomationProducts({
        balance,
        account: wallet.account,
        chainId: String(wallet.chainId),
        provider: wallet.provider,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  useEffect(() => {
    model.fetchBalanceFx()
  }, [])

  return (
    <AppLayout title="Settings">
      <Head title="Settings" />
      <div className={styles.root}>
        <div className={styles.header}>
          <Typography variant="h3">Account</Typography>
          <Button color="red" size="medium" onClick={handleLogout}>
            Log out
          </Button>
        </div>
        <SettingsWallets className={styles.section}>
          <Paper radius={8} className={styles.countMobile}>
            <Icon icon="automation" width="16" height="16" />
            <Typography variant="body3" className={styles.countTitle}>
              {balanceLoading ? '...' : balance}
            </Typography>
          </Paper>
          <Paper radius={8} className={styles.countDesktop}>
            <Typography variant="body2">
              {balanceLoading ? '...' : bignumberUtils.format(balance)}{' '}
              {pluralize(balance, 'Notification')}
              <Typography variant="inherit" className={styles.left}>
                left
              </Typography>
            </Typography>
          </Paper>
          <WalletConnect fallback={<Button>Buy</Button>}>
            <Button onClick={handleBuyProducts}>Buy</Button>
          </WalletConnect>
        </SettingsWallets>
        <SettingsContacts className={styles.section} />
        <SettingsTransactionHistory className={styles.section} />
        <SettingsIntegrations className={styles.section} />
        <StakingAutomates className={styles.section} />
      </div>
    </AppLayout>
  )
}
