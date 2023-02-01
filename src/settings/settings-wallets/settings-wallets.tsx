import isEmpty from 'lodash.isempty'
import { useEffect, useMemo, useState } from 'react'
import { useStore } from 'effector-react'
import clsx from 'clsx'
import contracts from '@defihelper/networks/contracts.json'

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
  SettingsWalletBalanceDialog,
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
import { CanDemo } from '~/auth/can-demo'
import { analytics } from '~/analytics'
import { ButtonBase } from '~/common/button-base'
import { SettingsWalletRefundDialog } from '~/settings/common/settings-wallet-refund-dialog'
import { bignumberUtils } from '~/common/bignumber-utils'
import * as styles from './settings-wallets.css'
import * as model from './settings-wallets.model'

export type SettingsWalletsProps = {
  className?: string
}

export const SettingsWallets: React.FC<SettingsWalletsProps> = (props) => {
  const wallets = useStore(model.$walletsWithMetrics)
  const networksWithBalance = useStore(model.$networksWithBalance)
  const loading = useStore(model.fetchWalletListMetricsFx.pending)

  const [openRenameWallet] = useDialog(SettingsRenameWalletDialog)
  const [openConfirm] = useDialog(SettingsConfirmDialog)
  const [openBalanceDialog] = useDialog(SettingsWalletBalanceDialog)
  const [openRefundDialog] = useDialog(SettingsWalletRefundDialog)
  const [openSuccess] = useDialog(SettingsSuccessDialog)
  const [showEmpty, setShowEmpty] = useState(false)

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

  const handleDeposit =
    (wallet: typeof wallets.nonEmpty[number]) => async () => {
      try {
        analytics.log('settings_wallet_defihelper_balance_top_up_click')
        await switchNetwork(wallet.network)

        if (!currentWallet?.account || !currentWallet.chainId) return

        const balanceAdapter = await model.loadAdapterFx({
          provider: currentWallet.provider,
          chainId: currentWallet.chainId,
          type:
            'BalanceUpgradable' in
            contracts[wallet.network as keyof typeof contracts]
              ? 'BalanceUpgradable'
              : 'Balance',
        })

        const billingBalance = await model.fetchBillingBalanceFx({
          blockchain: wallet.blockchain,
          network: wallet.network,
        })

        await openBalanceDialog({
          adapter: balanceAdapter,
          recomendedIncome: billingBalance.recomendedIncome,
          priceUSD: billingBalance.priceUSD,
          wallet: currentWallet.account,
          network: currentWallet.chainId,
          token: billingBalance.token,
          onSubmit: (result) => {
            if (!currentWallet.account) return

            model.depositFx({
              blockchain: wallet.blockchain,
              amount: result.amount,
              walletAddress: currentWallet.account,
              chainId: String(currentWallet.chainId),
              provider: currentWallet.provider,
              transactionHash: result.transactionHash,
            })
          },
        })

        await openSuccess({
          type: TransactionEnum.deposit,
        })
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }
  const handleRefund =
    (wallet: typeof wallets.nonEmpty[number]) => async () => {
      analytics.log('settings_wallet_defihelper_balance_refund_click')
      try {
        await switchNetwork(wallet.network)

        if (!currentWallet?.account || !currentWallet.chainId) return

        const hasNewContract =
          'BalanceUpgradable' in
          contracts[wallet.network as keyof typeof contracts]

        const hasOldContract =
          'Balance' in contracts[wallet.network as keyof typeof contracts]

        const oldBalanceAdapter = hasOldContract
          ? await model.loadAdapterFx({
              provider: currentWallet.provider,
              chainId: currentWallet.chainId,
              type: 'Balance',
            })
          : null

        const oldBalance = oldBalanceAdapter
          ? await oldBalanceAdapter.netBalance()
          : '0'

        const balanceAdapter = await model.loadAdapterFx({
          provider: currentWallet.provider,
          chainId: currentWallet.chainId,
          type:
            !hasNewContract || bignumberUtils.gt(oldBalance, '0')
              ? 'Balance'
              : 'BalanceUpgradable',
        })

        const billingBalance = await model.fetchBillingBalanceFx({
          blockchain: wallet.blockchain,
          network: wallet.network,
        })

        await openRefundDialog({
          adapter: balanceAdapter,
          token: billingBalance.token,
          onSubmit: (result) => {
            if (!currentWallet.account) return

            model.refundFx({
              blockchain: wallet.blockchain,
              amount: result.amount,
              walletAddress: currentWallet.account,
              chainId: String(currentWallet.chainId),
              provider: currentWallet.provider,
              transactionHash: result.transactionHash,
            })
          },
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
  const handleRename =
    (wallet: typeof wallets.nonEmpty[number]) => async () => {
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
  const handleDelete =
    (wallet: typeof wallets.nonEmpty[number]) => async () => {
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
    (wallet: typeof wallets.nonEmpty[number]) => async () => {
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
    analytics.log('portfolio_add_wallet_click')
    try {
      const wallet = await openWalletList()

      if (!wallet.account) return

      walletNetworkModel.signMessage({
        connector: wallet.connector,
        chainId: wallet.chainId,
        provider: wallet.provider,
        blockchain: wallet.blockchain,
        account: wallet.account,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    model.fetchWalletListMetricsFx(abortController.signal)

    return () => abortController.abort()
  }, [])

  const mergedWallets = [
    ...wallets.nonEmpty,
    ...(showEmpty || isEmpty(wallets.nonEmpty) ? wallets.empty : []),
  ]

  const paperCount = (mergedWallets.length ? 3 : 2) - mergedWallets.length

  const handleShowEmpty = () => setShowEmpty(true)

  return (
    <div className={clsx(styles.root, props.className)}>
      <SettingsHeader className={styles.header}>
        <Typography variant="h3">Wallets and Funds</Typography>
        {props.children}
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
        {!loading && ![...wallets.nonEmpty, ...wallets.empty].length && (
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
          mergedWallets.map((wallet) => {
            const connect = handleConnect.bind(null, {
              blockchain: wallet.blockchain,
              network: wallet.network,
            })

            const deposit = currentWallet ? handleDeposit(wallet) : connect
            const refund = currentWallet ? handleRefund(wallet) : connect

            const rename = currentWallet ? handleRename(wallet) : connect

            return (
              <SettingsWalletCard
                key={wallet.id}
                title={wallet.name}
                address={wallet.address}
                network={wallet.network}
                blockchain={wallet.blockchain}
                worth={wallet.metric?.worth ?? '0'}
                automations={String(wallet.automates?.length)}
                automationsWorth={wallet.automates?.reduce(
                  (acc, automate) =>
                    bignumberUtils.plus(acc, automate.metric.worth),
                  '0'
                )}
                statisticsCollectedAt={wallet.statisticsCollectedAt}
                hasContract={Boolean(networksWithBalance[wallet.network])}
                onDeposit={deposit}
                onRefund={refund}
                onRename={rename}
                onUpdateStatistics={handleUpdateStatistics(wallet)}
                onDelete={handleDelete(wallet)}
                feeFunds={wallet.billing?.balance?.netBalance ?? '0'}
                locked={wallet.billing?.balance?.claim ?? '0'}
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
      {!showEmpty && !isEmpty(wallets.empty) && !isEmpty(wallets.nonEmpty) && (
        <ButtonBase
          onClick={handleShowEmpty}
          className={styles.showEmptyWallets}
        >
          Show empty wallets ({wallets.empty.length})
        </ButtonBase>
      )}
    </div>
  )
}
