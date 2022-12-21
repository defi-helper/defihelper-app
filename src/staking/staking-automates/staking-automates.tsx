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
  stakingApi,
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
import { NULL_ADDRESS } from '~/common/constants'
import { InvestStopLossDialog } from '~/invest/common/invest-stop-loss-dialog'
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
  const currentUserWallet = useStore(settingsWalletModel.$currentUserWallet)
  const user = useStore(authModel.$user)
  const handleConnect = useWalletConnect()
  const [openConfirmDialog] = useDialog(ConfirmDialog)
  const [openStopLossDialog] = useDialog(InvestStopLossDialog)

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

        if (
          !adapter ||
          action === 'run' ||
          action === 'stopLoss' ||
          !currentUserWallet
        )
          return

        const can = await adapter.refund.methods.can()
        if (can instanceof Error) throw can

        history.push(
          `${paths.invest.detail(contract.contract?.id)}/unstake?automateId=${
            contract.id
          }`
        )
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

        if (!adapter || !currentUserWallet) return

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
              wallet: currentUserWallet.id,
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

  const handleStopLoss =
    (automateContract: typeof automatesContracts[number]) => async () => {
      try {
        if (!automateContract.contract) return
        if (!currentWallet?.account || !user)
          return toastsService.error('wallet is not connected')
        if (!automateContract.contract.automate.autorestake)
          return toastsService.error('adapter not found')

        const stakingAutomatesAdapter = await model.fetchAdapterFx({
          protocolAdapter: automateContract.contract.protocol.adapter,
          contractAdapter: automateContract.contract.automate.autorestake,
          contractId: automateContract.id,
          contractAddress: automateContract.address,
          provider: currentWallet.provider,
          chainId: String(currentWallet.chainId),
          action: 'stopLoss',
        })

        if (!stakingAutomatesAdapter)
          return toastsService.error('adapter not found')

        const tokens = await stakingApi.tokens({
          network: automateContract.contract.network,
          protocol: automateContract.contract.blockchain,
        })

        const res = await openStopLossDialog({
          adapter: stakingAutomatesAdapter.stopLoss,
          mainTokens: automateContract.contract.tokens.stake
            .map((token) => ({
              logoUrl: token.alias?.logoUrl ?? '',
              symbol: token.symbol,
              address: token.address,
            }))
            .filter(({ address }) => address !== NULL_ADDRESS),
          withdrawTokens: tokens.filter(
            ({ address }) => address !== NULL_ADDRESS
          ),
          initialStopLoss: automateContract.stopLoss,
          onDelete: () =>
            automationsListModel.deleteContractFx(automateContract.id),
          onToggleAutoCompound: (active) =>
            model.toggleAutoCompoundFx({ id: automateContract.id, active }),
          autoCompoundActive: automateContract.trigger?.active ?? null,
        })

        if (res.active) {
          await model.enableStopLossFx({
            contract: automateContract.id,
            path: res.path,
            amountOut: res.amountOut,
            amountOutMin: res.amountOutMin,
          })
        } else {
          await model.disableStopLossFx({
            contract: automateContract.id,
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        model.reset()
      }
    }

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

          const stopLoss =
            wrongNetwork ??
            isNotSameAddresses ??
            handleStopLoss(automatesContract)

          return (
            <StakingAutomatesContractCard
              key={automatesContract.id}
              automateId={automatesContract.id}
              contractWalletId={automatesContract.contractWallet?.id}
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
              onStopLoss={currentWallet ? stopLoss : connect}
              refunding={automatesContract.refunding}
              deleting={automatesContract.deleting}
              running={automatesContract.running}
              contractId={automatesContract.id}
              status={automatesContract.stopLoss?.status}
              stopLossAmountOut={automatesContract.stopLoss?.params?.amountOut}
              stopLossToken={automatesContract.stopLoss?.outToken?.symbol}
              error={automatesContract.wallet?.billing.balance.lowFeeFunds}
              freshMetrics={metrics[automatesContract.id]}
              balanceInvest={bignumberUtils.minus(
                bignumberUtils.plus(
                  automatesContract.metric.staked,
                  automatesContract.metric.earned
                ),
                automatesContract.metric.invest
              )}
            />
          )
        })}
      </div>
    </div>
  )
}
