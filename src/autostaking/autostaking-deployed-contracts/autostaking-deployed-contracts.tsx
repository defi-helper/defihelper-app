import clsx from 'clsx'
import isEmpty from 'lodash.isempty'
import { useMemo } from 'react'
import { useInterval, useMedia } from 'react-use'
import { useStore } from 'effector-react'

import { Paper } from '~/common/paper'
import { AutostakingCarousel } from '~/autostaking/common/autostaking-carousel'
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
  StakingAdapterDialog,
  StakingAutomatesContractCard,
  StakingDepositDialog,
  StakingErrorDialog,
  StakingRefundDialog,
} from '~/staking/common'
import { useDialog } from '~/common/dialog'
import { switchNetwork } from '~/wallets/common'
import { ConfirmDialog } from '~/common/confirm-dialog'
import { analytics } from '~/analytics'
import { settingsWalletModel } from '~/settings/settings-wallets'
import * as model from '~/staking/staking-automates/staking-automates.model'
import * as automationsListModel from '~/automations/automation-list/automation-list.model'
import * as styles from './autostaking-deployed-contracts.css'

export type AutostakingDeployedContractsProps = {
  className?: string
  search: string
}

export const AutostakingDeployedContracts: React.VFC<AutostakingDeployedContractsProps> =
  (props) => {
    const contracts = useStore(model.$automatesContracts)
    const loading = useStore(model.fetchAutomatesContractsFx.pending)
    const user = useStore(authModel.$user)
    const wallets = useStore(settingsWalletModel.$wallets)
    const { metrics } = useStore(model.$freshMetrics)

    const [openConfirmDialog] = useDialog(ConfirmDialog)
    const [openErrorDialog] = useDialog(StakingErrorDialog)
    const [openAdapter] = useDialog(StakingAdapterDialog)
    const [openDepositDialog] = useDialog(StakingDepositDialog)
    const [openRefundDialog] = useDialog(StakingRefundDialog)

    const currentWallet = walletNetworkModel.useWalletNetwork()
    const handleConnect = useWalletConnect()

    const isEmptyContracts = isEmpty(contracts)

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

    const handleAction =
      (
        contract: typeof contracts[number],
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

          const findedWallet = wallets.find((wallet) => {
            const sameAddreses =
              String(currentWallet.chainId) === 'main'
                ? currentWallet.account === wallet.address
                : currentWallet.account?.toLowerCase() === wallet.address

            return (
              sameAddreses && String(currentWallet.chainId) === wallet.network
            )
          })

          if (!adapter || action === 'run' || !findedWallet) return

          const onLastStep = (txId?: string) => {
            if (!contract.contract || !contract.contractWallet) return

            model
              .scanWalletMetricFx({
                wallet: contract.contractWallet.id,
                contract: contract.contract.id,
                txId,
              })
              .catch(console.error)

            model
              .scanWalletMetricFx({
                wallet: findedWallet.id,
                contract: contract.id,
                txId,
              })
              .catch(console.error)
          }

          const dialogs = {
            deposit: () =>
              openDepositDialog({
                methods: adapter.deposit.methods,
                onLastStep,
              }),
            refund: () =>
              openRefundDialog({
                methods: adapter.refund.methods,
                onLastStep,
              }),
          }

          if ('methods' in adapter[action]) {
            await dialogs[action]()
              .then(() => model.reset())
              .catch(() => model.reset())
          } else {
            await openAdapter({
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              steps: adapter[action],
              onLastStep,
            })
              .then(() => model.reset())
              .catch(() => model.reset())
          }

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
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message)
            analytics.log(
              `settings_${action}_network_${currentWallet?.chainId}_failure`,
              {
                address: contract.contractWallet?.address,
                network: contract.contractWallet?.network,
                blockchain: 'ethereum',
              }
            )
          }
        }
      }
    const handleRunManually =
      (contract: typeof contracts[number]) => async () => {
        try {
          if (
            bignumberUtils.eq(
              contract.contractWallet?.metric.stakedUSD ?? '',
              0
            )
          )
            throw new Error('not enough money')

          const findedWallet = wallets.find((wallet) => {
            const sameAddreses =
              String(currentWallet?.chainId) === 'main'
                ? currentWallet?.account === wallet.address
                : currentWallet?.account?.toLowerCase() === wallet.address

            return (
              sameAddreses && String(currentWallet?.chainId) === wallet.network
            )
          })

          if (!currentWallet?.account || !findedWallet) return

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
                wallet: findedWallet.id,
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

    const handleWrongAddress =
      (contract: typeof contracts[number]) => async () => {
        openErrorDialog({
          contractName: contract.contract?.name ?? '',
          address: contract.wallet.address,
          network: contract.wallet.network,
        }).catch(console.error)
      }

    const handleSwitchNetwork = (contract: typeof contracts[number]) => () =>
      switchNetwork(contract.wallet.network).catch(console.error)

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
            You don&apos;t have any deployed auto-staking contracts in
            DeFiHelper. Please try to deploy one.
          </Typography>
        )}
        {!isEmptyContracts && (
          <AutostakingCarousel
            count={contracts.length}
            slidesToShow={slidesToShow}
          >
            {contracts.map((deployedContract) => {
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

              const wrongNetwork =
                String(currentWallet?.chainId) !==
                deployedContract.wallet.network
                  ? handleSwitchNetwork(deployedContract)
                  : null

              const deposit =
                wrongNetwork ??
                isNotSameAddresses ??
                handleAction(deployedContract, 'deposit')

              const refund =
                wrongNetwork ??
                isNotSameAddresses ??
                handleAction(deployedContract, 'refund')

              const run =
                wrongNetwork ??
                isNotSameAddresses ??
                handleRunManually(deployedContract)

              return (
                <StakingAutomatesContractCard
                  key={deployedContract.id}
                  restakeAt={deployedContract.restakeAt ?? null}
                  title={deployedContract.contract?.name ?? ''}
                  address={deployedContract.address}
                  network={deployedContract.contract?.network ?? ''}
                  protocol={deployedContract.protocol}
                  tokensIcons={
                    deployedContract.contract?.tokens.stake.map(
                      ({ alias }) => alias?.logoUrl ?? null
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
                  onDeposit={currentWallet ? deposit : connect}
                  onRun={currentWallet ? run : connect}
                  deleting={deployedContract.deleting}
                  depositing={deployedContract.depositing}
                  running={deployedContract.running}
                  refunding={deployedContract.refunding}
                  error={
                    deployedContract.contractWallet?.billing?.balance
                      ?.lowFeeFunds ||
                    (deployedContract.wallet?.billing?.balance?.netBalanceUSD >
                      0.1 &&
                      deployedContract.wallet?.billing?.balance?.netBalanceUSD <
                        20)
                  }
                  freshMetrics={metrics[deployedContract.id]}
                />
              )
            })}
          </AutostakingCarousel>
        )}
      </Component>
    )
  }
