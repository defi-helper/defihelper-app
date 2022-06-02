import clsx from 'clsx'
import isEmpty from 'lodash.isempty'
import { useMemo } from 'react'
import { useMedia } from 'react-use'
import { useStore, useGate } from 'effector-react'

import { AutostakingDeployedContractCard } from '~/autostaking/common/autostaking-deployed-contract-card'
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
  StakingDepositDialog,
  StakingErrorDialog,
  StakingRefundDialog,
} from '~/staking/common'
import { useDialog } from '~/common/dialog'
import { switchNetwork } from '~/wallets/common'
import { ConfirmDialog } from '~/common/confirm-dialog'
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

    const [openConfirmDialog] = useDialog(ConfirmDialog)
    const [openErrorDialog] = useDialog(StakingErrorDialog)
    const [openAdapter] = useDialog(StakingAdapterDialog)
    const [openDepositDialog] = useDialog(StakingDepositDialog)
    const [openRefundDialog] = useDialog(StakingRefundDialog)

    const wallet = walletNetworkModel.useWalletNetwork()
    const handleConnect = useWalletConnect()

    useGate(model.StakingAutomatesGate, null)

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
          if (!wallet?.account) return

          const adapter = await model.fetchAdapterFx({
            protocolAdapter: contract.protocol.adapter,
            contractAdapter: contract.adapter,
            contractId: contract.id,
            contractAddress: contract.address,
            provider: wallet.provider,
            chainId: String(wallet.chainId),
            action,
          })

          if (!adapter || action === 'run') return

          const onLastStep = () => {
            if (!contract.contract || !contract.contractWallet) return

            model
              .scanWalletMetricFx({
                walletId: contract.contractWallet.id,
                contractId: contract.contract.id,
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
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message)
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

          if (!wallet?.account) return

          const adapter = await model.fetchAdapterFx({
            protocolAdapter: contract.protocol.adapter,
            contractAdapter: contract.adapter,
            contractId: contract.id,
            contractAddress: contract.address,
            provider: wallet.provider,
            chainId: String(wallet.chainId),
            action: 'run',
          })

          if (!adapter) return

          const tx = await adapter.run()

          await tx.wait()

          if (!contract.contract || !contract.contractWallet) return

          model
            .scanWalletMetricFx({
              walletId: contract.contractWallet.id,
              contractId: contract.contract.id,
            })
            .catch(console.error)
        } catch (error) {
          const { message } = parseError(error)

          toastsService.error(message)
        } finally {
          model.reset()
        }
      }

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
          [styles.empty]: isEmptyContracts || loading,
        })}
        radius={isEmptyContracts || loading ? 8 : undefined}
      >
        {loading && (
          <div className={styles.loader}>
            <Loader height="36" />
          </div>
        )}
        {isEmptyContracts && !loading && (
          <Typography variant="h4">
            We couldn&apos;t find any of your contracts on other services. We
            regularly check for outside contracts, and as soon as we find a
            match, you will see your contracts here with the deposit option.
          </Typography>
        )}
        {!isEmptyContracts && !loading && (
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
                String(wallet?.chainId) === 'main'
                  ? wallet?.account !== deployedContract.wallet.address
                  : wallet?.account?.toLowerCase() !==
                    deployedContract.wallet.address
              )
                ? handleWrongAddress(deployedContract)
                : null

              const wrongNetwork =
                String(wallet?.chainId) !== deployedContract.wallet.network
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
                <AutostakingDeployedContractCard
                  key={deployedContract.id}
                  title={deployedContract.contract?.name ?? ''}
                  address={deployedContract.address}
                  network={deployedContract.contract?.network ?? ''}
                  tokensIcons={
                    deployedContract.contract?.tokens.stake.map(
                      ({ alias }) => alias?.logoUrl ?? null
                    ) ?? []
                  }
                  blockchain={deployedContract.contract?.blockchain ?? ''}
                  value={
                    deployedContract.contractWallet?.metric.stakedUSD ?? ''
                  }
                  apy={deployedContract.contract?.metric.aprYear}
                  apyBoost={deployedContract.contract?.metric.myAPYBoost}
                  onDelete={handleOnDelete(deployedContract.id)}
                  onUnstake={wallet ? refund : connect}
                  onDeposit={wallet ? deposit : connect}
                  onRun={wallet ? run : connect}
                  deleting={deployedContract.deleting}
                  depositing={deployedContract.depositing}
                  running={deployedContract.running}
                  unstaking={deployedContract.refunding}
                />
              )
            })}
          </AutostakingCarousel>
        )}
      </Component>
    )
  }
