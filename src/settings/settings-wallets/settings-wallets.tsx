import { useEffect, useMemo } from 'react'
import { useStore } from 'effector-react'
import clsx from 'clsx'

import { Typography } from '~/common/typography'
import { Button } from '~/common/button'
import { useDialog } from '~/common/dialog'
import { toastsService } from '~/toasts'
import {
  SettingsHeader,
  SettingsInitialCard,
  SettingsPaper,
  SettingsRenameWalletDialog,
  SettingsConfirmDialog,
  SettingsBillingFormDialog,
  SettingsWalletLoading,
  SettingsSuccessDialog,
  TransactionEnum,
  SettingsWalletCard,
  useOnBillingTransferCreatedSubscription,
  useOnBillingTransferUpdatedSubscription,
  useOnWalletCreatedSubscription,
} from '~/settings/common'
import { cutAccount } from '~/common/cut-account'
import { useWalletList } from '~/wallets/wallet-list'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { switchNetwork } from '~/wallets/common'
import { useWalletConnect } from '~/wallets/wallet-connect'
import { authModel } from '~/auth'
import * as styles from './settings-wallets.css'
import * as model from './settings-wallets.model'
import { CanDemo } from '~/auth/can-demo'
import { analytics } from '~/analytics'

export type SettingsWalletsProps = {
  className?: string
}

export const SettingsWallets: React.VFC<SettingsWalletsProps> = (props) => {
  const wallets = useStore(model.$walletsWithMetrics)
  const loading = useStore(model.fetchWalletListFx.pending)

  const [openRenameWallet] = useDialog(SettingsRenameWalletDialog)
  const [openConfirm] = useDialog(SettingsConfirmDialog)
  const [openBillingForm] = useDialog(SettingsBillingFormDialog)
  const [openSuccess] = useDialog(SettingsSuccessDialog)

  const user = useStore(authModel.$user)

  const [openWalletList] = useWalletList()
  const handleConnect = useWalletConnect()
  const currentWallet = walletNetworkModel.useWalletNetwork()

  const variables = useMemo(() => {
    if (!user) return undefined

    return {
      user: [user.id],
    }
  }, [user])

  useOnBillingTransferCreatedSubscription(({ data }) => {
    if (data?.onBillingTransferCreated.id) {
      model.updated()
    }
  }, variables)
  useOnBillingTransferUpdatedSubscription(({ data }) => {
    if (data?.onBillingTransferUpdated.id) {
      model.updated()
    }
  }, variables)
  useOnWalletCreatedSubscription(({ data }) => {
    if (data?.onWalletCreated.id) {
      model.updated()
    }
  }, variables)

  const handleDeposit = (wallet: typeof wallets[number]) => async () => {
    try {
      await switchNetwork(wallet.network)

      if (!currentWallet?.account) return

      const result = await openBillingForm()

      await model.depositFx({
        blockchain: wallet.blockchain,
        amount: result.amount,
        walletAddress: currentWallet.account,
        chainId: String(currentWallet.chainId),
        provider: currentWallet.provider,
      })

      analytics.onDeposit()
      await openSuccess({
        type: TransactionEnum.deposit,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }
  const handleRefund = (wallet: typeof wallets[number]) => async () => {
    try {
      await switchNetwork(wallet.network)

      if (!currentWallet?.account) return

      const result = await openBillingForm()

      await model.refundFx({
        blockchain: wallet.blockchain,
        amount: result.amount,
        walletAddress: currentWallet.account,
        chainId: String(currentWallet.chainId),
        provider: currentWallet.provider,
      })

      await openSuccess({
        type: TransactionEnum.refund,
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

  const handleUpdateStatistics =
    (wallet: typeof wallets[number]) => async () => {
      try {
        model.updateStatisticsWalletFx(wallet.id)
        toastsService.success('Statistics will be updated in several minutes')
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
        connector: wallet.connector,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  useEffect(() => {
    model.fetchWalletListMetricsFx()
  }, [])

  const paperCount = (wallets.length ? 3 : 2) - wallets.length

  return (
    <div className={clsx(styles.root, props.className)}>
      <SettingsHeader className={styles.header}>
        <Typography variant="h3">Wallets and Funds</Typography>
        <CanDemo>
          <Button
            color="blue"
            onClick={handleAddWallet}
            className={styles.addButton}
          >
            +
            <Typography variant="inherit" className={styles.addButtonTitle}>
              Add Wallet
            </Typography>
          </Button>
        </CanDemo>
      </SettingsHeader>
      <div className={styles.list}>
        {loading && <SettingsWalletLoading />}
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
        {!loading &&
          wallets.map((wallet) => {
            const connect = handleConnect.bind(null, {
              blockchain: wallet.blockchain,
              network: wallet.network,
            })

            return (
              <SettingsWalletCard
                key={wallet.id}
                title={wallet.name}
                address={wallet.address}
                network={wallet.network}
                blockchain={wallet.blockchain}
                worth={wallet.metric?.worth ?? '0'}
                automations={String(wallet.triggersCount ?? 0)}
                statisticsCollectedAt={wallet.statisticsCollectedAt}
                onDeposit={currentWallet ? handleDeposit(wallet) : connect}
                onRefund={currentWallet ? handleRefund(wallet) : connect}
                onRename={currentWallet ? handleRename(wallet) : connect}
                onUpdateStatistics={handleUpdateStatistics(wallet)}
                onDelete={handleDelete(wallet)}
                feeFunds={wallet.billing?.balance?.netBalance ?? 0}
                locked={wallet.billing?.balance?.claim ?? 0}
                editing={wallet.editing}
                deleting={wallet.deleting}
                depositing={wallet.depositing}
                refunding={wallet.refunding}
                error={wallet.billing?.balance?.lowFeeFunds}
              />
            )
          })}
        {!loading &&
          paperCount > 0 &&
          Array.from(Array(paperCount)).map((_, index) => (
            <SettingsPaper key={String(index)} />
          ))}
      </div>
    </div>
  )
}
