import { useGate, useStore } from 'effector-react'
import clsx from 'clsx'

import { Typography } from '~/common/typography'
import { Button } from '~/common/button'
import { useDialog } from '~/common/dialog'
import {
  SettingsHeader,
  SettingsInitialCard,
  SettingsPaper,
  SettingsWalletCard,
  SettingsRenameWalletDialog,
  SettingsConfirmDialog,
  SettingsBillingFormDialog,
} from '~/settings/common'
import { cutAccount } from '~/common/cut-account'
import { useWalletList } from '~/wallets/wallet-list'
import * as styles from './settings-wallets.css'
import * as model from './settings-wallets.model'
import { walletNetworkModel } from '~/wallets/wallet-networks'

export type SettingsWalletsProps = {
  className?: string
}

export const SettingsWallets: React.VFC<SettingsWalletsProps> = (props) => {
  const wallets = useStore(model.$wallets)
  const loading = useStore(model.fetchWalletListFx.pending)

  const [openRenameWallet] = useDialog(SettingsRenameWalletDialog)
  const [openConfirm] = useDialog(SettingsConfirmDialog)
  const [openBillingForm] = useDialog(SettingsBillingFormDialog)

  const [openWalletList] = useWalletList()

  const handleDeposit = (wallet: typeof wallets[number]) => async () => {
    try {
      const walletData = await openWalletList({ blockchain: wallet.blockchain })

      if (!walletData.account) return

      const result = await openBillingForm()

      model.depositFx({
        amount: result.amount,
        walletAddress: walletData.account,
        chainId: String(walletData.chainId),
        provider: walletData.provider,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }
  const handleRefund = (wallet: typeof wallets[number]) => async () => {
    try {
      const walletData = await openWalletList({ blockchain: wallet.blockchain })

      if (!walletData.account) return

      const result = await openBillingForm()

      model.refundFx({
        amount: result.amount,
        walletAddress: walletData.account,
        chainId: String(walletData.chainId),
        provider: walletData.provider,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }
  const handleRename = (wallet: typeof wallets[number]) => async () => {
    try {
      const result = await openRenameWallet({
        defaultValues: {
          name: wallet.name,
        },
      })

      model.updateWalletFx({
        walletId: wallet.id,
        name: result.name,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }
  const handleDelete = (wallet: typeof wallets[number]) => async () => {
    try {
      await openConfirm({ name: wallet.name || cutAccount(wallet.address) })

      model.deleteWalletFx(wallet.id)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleAddWallet = async () => {
    try {
      const wallet = await openWalletList()

      if (!wallet.account) return

      walletNetworkModel.signMessage({
        chainId: String(wallet.chainId),
        provider: wallet.provider,
        account: wallet.account,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  useGate(model.SettingsWalletGate)

  const paperCount = (wallets.length ? 3 : 2) - wallets.length

  return (
    <div className={clsx(styles.root, props.className)}>
      <SettingsHeader className={styles.header}>
        <Typography variant="h3">Wallets and Funds</Typography>
        <Button color="blue" onClick={handleAddWallet}>
          + Add Wallet
        </Button>
      </SettingsHeader>
      <div className={styles.list}>
        {loading && 'loading...'}
        {!loading && !wallets.length && (
          <SettingsInitialCard>
            <Typography variant="body2">
              Connect your wallets. You will see all statistics in portfolio,
              will be able to automate actions and setup notifications.
            </Typography>
            <Button size="small" onClick={handleAddWallet}>
              + Add Wallet
            </Button>
          </SettingsInitialCard>
        )}
        {wallets.map((wallet) => (
          <SettingsWalletCard
            key={wallet.id}
            title={wallet.name || 'untitled'}
            address={wallet.address}
            network={wallet.network}
            blockchain={wallet.blockchain}
            automations="0"
            onDeposit={handleDeposit(wallet)}
            onRefund={handleRefund(wallet)}
            onRename={handleRename(wallet)}
            onDelete={handleDelete(wallet)}
            feeFunds={wallet.billing?.balance?.netBalance}
            locked={wallet.billing?.balance?.claim}
            editing={wallet.editing}
            deleting={wallet.deleting}
            depositing={wallet.depositing}
            refunding={wallet.refunding}
          />
        ))}
        {!loading &&
          paperCount > 0 &&
          Array.from(Array(paperCount)).map((_, index) => (
            <SettingsPaper key={String(index)} />
          ))}
      </div>
    </div>
  )
}
