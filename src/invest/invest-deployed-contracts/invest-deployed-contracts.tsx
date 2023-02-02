import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import isEmpty from 'lodash.isempty'
import { useMemo } from 'react'
import { useInterval, useMedia } from 'react-use'
import { useStore } from 'effector-react'
import contracts from '@defihelper/networks/contracts.json'

import { Paper } from '~/common/paper'
import { InvestCarousel } from '~/invest/common/invest-carousel'
import { Typography } from '~/common/typography'
import { Loader } from '~/common/loader'
import {
  useOnTokenMetricUpdatedSubscription,
  useOnWalletMetricUpdatedSubscription,
} from '~/portfolio/common'
import { authModel } from '~/auth'
import { useWalletConnect } from '~/wallets/wallet-connect'
import { bignumberUtils } from '~/common/bignumber-utils'
import { toastsService } from '~/toasts'
import { parseError } from '~/common/parse-error'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import {
  stakingApi,
  StakingAutomatesContractCard,
  StakingErrorDialog,
} from '~/staking/common'
import { useDialog } from '~/common/dialog'
import { ConfirmDialog } from '~/common/confirm-dialog'
import { analytics } from '~/analytics'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { InvestStopLossDialog } from '~/invest/common/invest-stop-loss-dialog'
import { paths } from '~/paths'
import { NULL_ADDRESS } from '~/common/constants'
import * as model from './invest-deployed-contracts.model'
import * as automationsListModel from '~/automations/automation-list/automation-list.model'
import * as styles from './invest-deployed-contracts.css'
import {
  SettingsSuccessDialog,
  SettingsWalletBalanceDialog,
  TransactionEnum,
} from '~/settings/common'
import { useOnAutomateContractUpdatedSubscription } from '../common/subscriptions'

export type InvestDeployedContractsProps = {
  className?: string
}

export const InvestDeployedContracts: React.VFC<InvestDeployedContractsProps> =
  (props) => {
    const history = useHistory()
    const automatesContracts = useStore(model.$automatesContracts)
    const loading = useStore(model.fetchAutomatesContractsFx.pending)
    const user = useStore(authModel.$user)
    const { metrics } = useStore(model.$freshMetrics)

    const [openConfirmDialog] = useDialog(ConfirmDialog)
    const [openErrorDialog] = useDialog(StakingErrorDialog)
    const [openStopLossDialog] = useDialog(InvestStopLossDialog)
    const [openBalanceDialog] = useDialog(SettingsWalletBalanceDialog)
    const [openSuccess] = useDialog(SettingsSuccessDialog)

    const currentWallet = walletNetworkModel.useWalletNetwork()
    const currentUserWallet = useStore(settingsWalletModel.$currentUserWallet)
    const handleConnect = useWalletConnect()

    const isEmptyContracts = isEmpty(automatesContracts)

    const Component = isEmptyContracts ? Paper : 'div'

    const isDesktop = useMedia('(min-width: 1440px)')
    const isTablet = useMedia('(min-width: 960px)')

    const slidesToShow = useMemo(() => {
      if (isDesktop) {
        return 3
      }

      if (isTablet) {
        return 2
      }

      return 1
    }, [isDesktop, isTablet])

    const handleOnDelete = (contractId: string) => async () => {
      try {
        await openConfirmDialog()

        automationsListModel.deleteContractFx(contractId)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

    const handleDepositWallet =
      (automateContract: typeof automatesContracts[number]) => async () => {
        const wallet = automateContract.contract

        if (!wallet) return

        try {
          analytics.log('settings_wallet_defihelper_balance_top_up_click')

          if (!currentWallet?.account || !currentWallet.chainId) return

          const balanceAdapter = await settingsWalletModel.loadAdapterFx({
            provider: currentWallet.provider,
            chainId: currentWallet.chainId,
            type:
              'BalanceUpgradable' in
              contracts[wallet.network as keyof typeof contracts]
                ? 'BalanceUpgradable'
                : 'Balance',
          })

          const billingBalance =
            await settingsWalletModel.fetchBillingBalanceFx({
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

              settingsWalletModel.depositFx({
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

    const handleAction =
      (
        contract: typeof automatesContracts[number],
        action: Exclude<model.ActionType, 'migrate'>
      ) =>
      async () => {
        try {
          if (!currentWallet?.account) return
          analytics.log(
            `settings_${action}_network_${currentWallet?.chainId}_click`,
            {
              address: contract.contractWallet?.address,
              network: contract.contractWallet?.network,
              blockchain: 'ethereum',
              provider: currentWallet.provider,
              chainId: String(currentWallet.chainId),
            }
          )

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

          analytics.log(
            `settings_${action}_network_${currentWallet?.chainId}_success`,
            {
              address: contract.contractWallet?.address,
              network: contract.contractWallet?.network,
              blockchain: 'ethereum',
              provider: currentWallet.provider,
              chainId: String(currentWallet.chainId),
            }
          )

          history.push(
            `${paths.invest.detail(contract.contract?.id)}/unstake?automateId=${
              contract.id
            }`
          )
        } catch (error) {
          const { message } = parseError(error)

          toastsService.error(message)

          console.error(message)
          analytics.log(
            `settings_${action}_network_${currentWallet?.chainId}_failure`,
            {
              address: contract.contractWallet?.address,
              network: contract.contractWallet?.network,
              blockchain: 'ethereum',
            }
          )
        } finally {
          model.reset()
        }
      }
    const handleRunManually =
      (contract: typeof automatesContracts[number]) => async () => {
        try {
          if (
            bignumberUtils.eq(
              contract.contractWallet?.metric.stakedUSD ?? '',
              0
            )
          )
            throw new Error('not enough money')

          if (!currentWallet?.account || !currentUserWallet) return

          const adapter = await model.fetchAdapterFx({
            protocolAdapter: contract.protocol.adapter,
            contractAdapter: contract.adapter,
            contractId: contract.id,
            contractAddress: contract.address,
            provider: currentWallet.provider,
            chainId: String(currentWallet.chainId),
            action: 'run',
          })

          if (!adapter) return

          const tx = await adapter.run()

          const trasactionReceipt = await tx.wait()

          if (contract.contract && contract.contractWallet) {
            model
              .scanWalletMetricFx({
                wallet: contract.contractWallet.id,
                contract: contract.contract.id,
                txId: trasactionReceipt.transactionHash,
              })
              .catch(console.error)

            model
              .scanWalletMetricFx({
                wallet: currentUserWallet.id,
                contract: contract.id,
                txId: trasactionReceipt.transactionHash,
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

    useInterval(
      () => {
        if (currentWallet) {
          model.fetchMetrics(currentWallet)
        }
      },
      currentWallet ? 15000 : null
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

    const updateContractVariables = useMemo(() => {
      if (!user) return undefined

      return {
        user: user.id,
      }
    }, [user])

    useOnAutomateContractUpdatedSubscription(({ data }) => {
      if (!data?.onAutomateContractUpdated.id) return

      model.updateContract(data.onAutomateContractUpdated)
    }, updateContractVariables)

    const handleWrongAddress =
      (contract: typeof automatesContracts[number]) => async () => {
        openErrorDialog({
          contractName: contract.contract?.name ?? '',
          address: contract.wallet.address,
          network: contract.wallet.network,
        }).catch(console.error)
      }

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
                id: token.id,
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
            canDelete:
              bignumberUtils.eq(automateContract.metric.invest, 0) ||
              automateContract.stopLoss?.amountOut !== null,
          })

          if (res.active) {
            await model.enableStopLossFx({
              contract: automateContract.id,
              path: res.path,
              amountOut: res.amountOut,
              amountOutMin: res.amountOutMin,
              inToken: res.mainToken,
              outToken: res.withdrawToken,
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

    return (
      <Component
        className={clsx(props.className, {
          [styles.empty]: isEmptyContracts && !loading,
        })}
        radius={isEmptyContracts || loading ? 8 : undefined}
      >
        {loading && isEmptyContracts && (
          <div className={clsx(styles.loader, styles.empty)}>
            <Loader height="36" />
          </div>
        )}
        {isEmptyContracts && !loading && (
          <Typography variant="h4">
            You don&apos;t have any investments in DeFiHelper. You can try to
            invest some.
          </Typography>
        )}
        {!isEmptyContracts && (
          <InvestCarousel
            count={automatesContracts.length}
            slidesToShow={slidesToShow}
          >
            {automatesContracts.map((deployedContract) => {
              const connect = handleConnect.bind(null, {
                blockchain: deployedContract.contract?.blockchain,
                network: deployedContract.contract?.network,
              })

              const isNotSameAddresses = (
                String(currentWallet?.chainId) === 'main'
                  ? currentWallet?.account !== deployedContract.wallet.address
                  : currentWallet?.account?.toLowerCase() !==
                    deployedContract.wallet.address
              )
                ? handleWrongAddress(deployedContract)
                : null

              const refund =
                isNotSameAddresses ?? handleAction(deployedContract, 'refund')

              const stopLoss =
                isNotSameAddresses ?? handleStopLoss(deployedContract)

              const run =
                isNotSameAddresses ?? handleRunManually(deployedContract)

              const depositWallet =
                isNotSameAddresses ?? handleDepositWallet(deployedContract)

              const staked =
                metrics[deployedContract.id]?.myStaked ??
                deployedContract.metric.staked

              return (
                <StakingAutomatesContractCard
                  key={deployedContract.id}
                  staked={deployedContract.metric.staked}
                  blockedAt={deployedContract.blockedAt ?? null}
                  invest={deployedContract.metric.invest}
                  protocolAdapter={deployedContract.contract?.protocol.adapter}
                  restakeAt={deployedContract.restakeAt ?? null}
                  title={deployedContract.contract?.name ?? ''}
                  address={deployedContract.address}
                  network={deployedContract.contract?.network ?? ''}
                  protocol={deployedContract.protocol}
                  automateId={deployedContract.id}
                  contractWalletId={deployedContract.contractWallet?.id}
                  onDepositWallet={depositWallet}
                  stopLossTx={deployedContract.stopLoss?.tx}
                  hasHistory={Boolean(
                    deployedContract.trigger?.callHistory.list?.length
                  )}
                  tokensIcons={
                    deployedContract.contract?.tokens.stake.map(
                      ({ alias, address }) => ({
                        logoUrl: alias?.logoUrl ?? null,
                        address,
                      })
                    ) ?? []
                  }
                  blockchain={deployedContract.contract?.blockchain ?? ''}
                  balance={
                    deployedContract.contractWallet?.metric.stakedUSD ?? ''
                  }
                  apy={deployedContract.contract?.metric.aprYear}
                  apyBoost={deployedContract.contract?.metric.myAPYBoost}
                  onDelete={handleOnDelete(deployedContract.id)}
                  onRefund={currentWallet ? refund : connect}
                  onRun={currentWallet ? run : connect}
                  onStopLoss={currentWallet ? stopLoss : connect}
                  deleting={deployedContract.deleting}
                  metricUni3={deployedContract.metricUni3}
                  running={deployedContract.running}
                  refunding={deployedContract.refunding}
                  contractId={deployedContract.contract?.id}
                  stopLossing={deployedContract.stopLossing}
                  status={deployedContract.stopLoss?.status}
                  stopLossAmountOut={
                    deployedContract.stopLoss?.amountOut ??
                    deployedContract.stopLoss?.params.amountOut
                  }
                  stopLossToken={deployedContract.stopLoss?.outToken?.symbol}
                  error={deployedContract.wallet?.billing?.balance?.lowFeeFunds}
                  freshMetrics={metrics[deployedContract.id]}
                  balanceInvest={
                    bignumberUtils.eq(staked, 0)
                      ? '0'
                      : bignumberUtils.minus(
                          bignumberUtils.plus(
                            staked,
                            deployedContract.metric.earned
                          ),
                          deployedContract.metric.invest
                        )
                  }
                />
              )
            })}
          </InvestCarousel>
        )}
      </Component>
    )
  }
