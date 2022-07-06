import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { useMemo } from 'react'
import isEmpty from 'lodash.isempty'

import { useDialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import { ConfirmDialog } from '~/common/confirm-dialog'
import {
  StakingAutomatesContractCard,
  StakingAdapterDialog,
  StakingErrorDialog,
  StakingDepositDialog,
  StakingMigrateDialog,
  StakingRefundDialog,
} from '~/staking/common'
import { switchNetwork } from '~/wallets/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { useWalletConnect } from '~/wallets/wallet-connect'
import { authModel } from '~/auth'
import * as automationsListModel from '~/automations/automation-list/automation-list.model'
import { parseError } from '~/common/parse-error'
import { toastsService } from '~/toasts'
import * as styles from './staking-automates.css'
import * as model from './staking-automates.model'
import { bignumberUtils } from '~/common/bignumber-utils'
import {
  useOnTokenMetricUpdatedSubscription,
  useOnWalletMetricUpdatedSubscription,
} from '~/portfolio/common'

export type StakingAutomatesProps = {
  className?: string
  protocolId?: string
}

export const StakingAutomates: React.VFC<StakingAutomatesProps> = (props) => {
  const [openErrorDialog] = useDialog(StakingErrorDialog)
  const wallet = walletNetworkModel.useWalletNetwork()
  const user = useStore(authModel.$user)
  const handleConnect = useWalletConnect()
  const [openAdapter] = useDialog(StakingAdapterDialog)
  const [openConfirmDialog] = useDialog(ConfirmDialog)
  const [openDepositDialog] = useDialog(StakingDepositDialog)
  const [openMigrateDialog] = useDialog(StakingMigrateDialog)
  const [openRefundDialog] = useDialog(StakingRefundDialog)

  const automatesContracts = useStore(model.$automatesContracts)

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
          migrate: () =>
            openMigrateDialog({
              methods: adapter.migrate.methods,
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
    (contract: typeof automatesContracts[number]) => async () => {
      try {
        if (
          bignumberUtils.eq(contract.contractWallet?.metric.stakedUSD ?? '', 0)
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
        if (contract.contract && contract.contractWallet) {
          model
            .scanWalletMetricFx({
              walletId: contract.contractWallet.id,
              contractId: contract.contract.id,
            })
            .catch(console.error)
        }

        await tx.wait()
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

  if (isEmpty(automatesContracts)) return <></>

  return (
    <div className={clsx(styles.root, props.className)}>
      <Typography variant="h3" className={styles.title}>
        Deployed Automations
      </Typography>
      <div className={styles.list}>
        {automatesContracts.map((automatesContract) => {
          const connect = handleConnect.bind(null, {
            blockchain: automatesContract.contract?.blockchain,
            network: automatesContract.contract?.network,
          })

          const isNotSameAddresses = (
            String(wallet?.chainId) === 'main'
              ? wallet?.account !== automatesContract.wallet.address
              : wallet?.account?.toLowerCase() !==
                automatesContract.wallet.address
          )
            ? handleWrongAddress(automatesContract)
            : null

          const wrongNetwork =
            String(wallet?.chainId) !== automatesContract.wallet.network
              ? handleSwitchNetwork(automatesContract)
              : null

          const migrate =
            wrongNetwork ??
            isNotSameAddresses ??
            handleAction(automatesContract, 'migrate')

          const deposit =
            wrongNetwork ??
            isNotSameAddresses ??
            handleAction(automatesContract, 'deposit')

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
              onMigrate={wallet ? migrate : connect}
              onDeposit={wallet ? deposit : connect}
              onRefund={wallet ? refund : connect}
              onRun={wallet ? run : connect}
              onDelete={handleDelete(automatesContract.id)}
              refunding={automatesContract.refunding}
              migrating={automatesContract.migrating}
              depositing={automatesContract.depositing}
              deleting={automatesContract.deleting}
              running={automatesContract.running}
              error={
                automatesContract.contractWallet?.billing.balance.lowFeeFunds
              }
            />
          )
        })}
      </div>
    </div>
  )
}
