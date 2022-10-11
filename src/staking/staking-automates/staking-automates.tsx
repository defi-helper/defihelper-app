import { useHistory } from 'react-router-dom'
import { useInterval } from 'react-use'
import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { useMemo } from 'react'
import isEmpty from 'lodash.isempty'

import { useDialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import { ConfirmDialog } from '~/common/confirm-dialog'
import {
  StakingAutomatesContractCard,
  StakingErrorDialog,
} from '~/staking/common'
import { switchNetwork } from '~/wallets/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { useWalletConnect } from '~/wallets/wallet-connect'
import { authModel } from '~/auth'
import * as automationsListModel from '~/automations/automation-list/automation-list.model'
import { parseError } from '~/common/parse-error'
import { toastsService } from '~/toasts'
import { bignumberUtils } from '~/common/bignumber-utils'
import {
  useOnTokenMetricUpdatedSubscription,
  useOnWalletMetricUpdatedSubscription,
} from '~/portfolio/common'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { paths } from '~/paths'
import * as styles from './staking-automates.css'
import * as model from './staking-automates.model'

export type StakingAutomatesProps = {
  className?: string
  protocolId?: string
}

export const StakingAutomates: React.VFC<StakingAutomatesProps> = (props) => {
  const history = useHistory()
  const [openErrorDialog] = useDialog(StakingErrorDialog)
  const currentWallet = walletNetworkModel.useWalletNetwork()
  const wallets = useStore(settingsWalletModel.$wallets)
  const user = useStore(authModel.$user)
  const handleConnect = useWalletConnect()
  const [openConfirmDialog] = useDialog(ConfirmDialog)

  const automatesContracts = useStore(model.$automatesContracts)
  const { metrics } = useStore(model.$freshMetrics)

  const handleDelete = (contractId: string) => async () => {
    try {
      await openConfirmDialog()

      automationsListModel.deleteContractFx(contractId)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleSwitchNetwork =
    (contract: typeof automatesContracts[number]) => () =>
      switchNetwork(contract.wallet.network).catch(console.error)

  const handleWrongAddress =
    (contract: typeof automatesContracts[number]) => async () => {
      openErrorDialog({
        contractName: contract.contract?.name ?? '',
        address: contract.wallet.address,
        network: contract.wallet.network,
      }).catch(console.error)
    }

  const handleAction =
    (contract: typeof automatesContracts[number], action: model.ActionType) =>
    async () => {
      try {
        if (!currentWallet?.account) return

        const adapter = await model.fetchAdapterFx({
          protocolAdapter: contract.protocol.adapter,
          contractAdapter: contract.adapter,
          contractId: contract.id,
          contractAddress: contract.address,
          provider: currentWallet.provider,
          chainId: String(currentWallet.chainId),
          action,
        })

        const findedWallet = wallets.find((wallet) => {
          const sameAddreses =
            String(currentWallet?.chainId) === 'main'
              ? currentWallet?.account === wallet.address
              : currentWallet?.account?.toLowerCase() === wallet.address

          return (
            sameAddreses && String(currentWallet?.chainId) === wallet.network
          )
        })

        if (
          !adapter ||
          action === 'run' ||
          action === 'stopLoss' ||
          !findedWallet
        )
          return

        const can = await adapter.refund.methods.can()
        if (can instanceof Error) throw can

        history.push(`${paths.invest.detail(contract.contract?.id)}/unstake`)
      } catch (error) {
        const { message } = parseError(error)

        toastsService.error(message)
      }
    }

  const handleRunManually =
    (contract: typeof automatesContracts[number]) => async () => {
      try {
        if (
          bignumberUtils.eq(contract.contractWallet?.metric.stakedUSD ?? '', 0)
        )
          throw new Error('not enough money')

        if (!currentWallet?.account) return

        const adapter = await model.fetchAdapterFx({
          protocolAdapter: contract.protocol.adapter,
          contractAdapter: contract.adapter,
          contractId: contract.id,
          contractAddress: contract.address,
          provider: currentWallet.provider,
          chainId: String(currentWallet.chainId),
          action: 'run',
        })

        const findedWallet = wallets.find((wallet) => {
          const sameAddreses =
            String(currentWallet?.chainId) === 'main'
              ? currentWallet?.account === wallet.address
              : currentWallet?.account?.toLowerCase() === wallet.address

          return (
            sameAddreses && String(currentWallet?.chainId) === wallet.network
          )
        })

        if (!adapter || !findedWallet) return

        const tx = await adapter.run()

        const result = await tx.wait()

        if (contract.contract && contract.contractWallet) {
          model
            .scanWalletMetricFx({
              wallet: contract.contractWallet.id,
              contract: contract.contract.id,
              txId: result.transactionHash,
            })
            .catch(console.error)

          model
            .scanWalletMetricFx({
              wallet: findedWallet.id,
              contract: contract.id,
              txId: result.transactionHash,
            })
            .catch(console.error)
        }
      } catch (error) {
        const { message } = parseError(error)

        toastsService.error(message)
      } finally {
        model.reset()
      }
    }

  useGate(
    model.StakingAutomatesGate,
    props.protocolId ? { protocolId: props.protocolId } : null
  )

  const variables = useMemo(() => {
    if (!user) return undefined

    return {
      user: [user.id],
    }
  }, [user])

  useOnWalletMetricUpdatedSubscription(({ data }) => {
    if (data?.onWalletMetricUpdated.id) {
      model.updated()
    }
  }, variables)
  useOnTokenMetricUpdatedSubscription(({ data }) => {
    if (data?.onTokenMetricUpdated.id) {
      model.updated()
    }
  }, variables)

  useInterval(
    () => {
      if (currentWallet) {
        model.fetchMetrics(currentWallet)
      }
    },
    currentWallet ? 15000 : null
  )

  if (isEmpty(automatesContracts)) return <></>

  return (
    <div className={clsx(styles.root, props.className)}>
      <Typography variant="h3" className={styles.title}>
        Your investments
      </Typography>
      <div className={styles.list}>
        {automatesContracts.map((automatesContract) => {
          const connect = handleConnect.bind(null, {
            blockchain: automatesContract.contract?.blockchain,
            network: automatesContract.contract?.network,
          })

          const isNotSameAddresses = (
            String(currentWallet?.chainId) === 'main'
              ? currentWallet?.account !== automatesContract.wallet.address
              : currentWallet?.account?.toLowerCase() !==
                automatesContract.wallet.address
          )
            ? handleWrongAddress(automatesContract)
            : null

          const wrongNetwork =
            String(currentWallet?.chainId) !== automatesContract.wallet.network
              ? handleSwitchNetwork(automatesContract)
              : null

          const refund =
            wrongNetwork ??
            isNotSameAddresses ??
            handleAction(automatesContract, 'refund')

          const run =
            wrongNetwork ??
            isNotSameAddresses ??
            handleRunManually(automatesContract)

          return (
            <StakingAutomatesContractCard
              key={automatesContract.id}
              restakeAt={automatesContract.restakeAt ?? null}
              tokensIcons={
                automatesContract.contract?.tokens.stake.map(
                  ({ alias }) => alias?.logoUrl ?? null
                ) ?? []
              }
              title={automatesContract.contract?.name ?? ''}
              address={automatesContract.address}
              network={automatesContract.contract?.network ?? ''}
              blockchain={automatesContract.contract?.blockchain ?? ''}
              balance={automatesContract.contractWallet?.metric.stakedUSD ?? ''}
              apy={automatesContract.contract?.metric.aprYear}
              apyBoost={automatesContract.contract?.metric.myAPYBoost}
              onRefund={currentWallet ? refund : connect}
              onRun={currentWallet ? run : connect}
              onDelete={handleDelete(automatesContract.id)}
              refunding={automatesContract.refunding}
              deleting={automatesContract.deleting}
              running={automatesContract.running}
              contractId={automatesContract.id}
              status={automatesContract.stopLoss?.status}
              stopLossAmountOut={automatesContract.stopLoss?.params?.amountOut}
              stopLossToken={automatesContract.stopLoss?.outToken?.symbol}
              error={
                automatesContract.contractWallet?.billing.balance.lowFeeFunds ||
                (automatesContract.wallet?.billing?.balance?.netBalanceUSD >
                  0.1 &&
                  automatesContract.wallet?.billing?.balance?.netBalanceUSD <
                    20)
              }
              freshMetrics={metrics[automatesContract.id]}
            />
          )
        })}
      </div>
    </div>
  )
}
