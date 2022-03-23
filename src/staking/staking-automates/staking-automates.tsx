import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { useEffect, useMemo } from 'react'
import isEmpty from 'lodash.isempty'
import { useThrottle } from 'react-use'

import { useDialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import { ConfirmDialog } from '~/common/confirm-dialog'
import {
  StakingAutomatesContractCard,
  StakingAdapterDialog,
  StakingErrorDialog,
} from '~/staking/common'
import { switchNetwork } from '~/wallets/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { useWalletConnect } from '~/wallets/wallet-connect'
import { authModel } from '~/auth'
import * as automationsListModel from '~/automations/automation-list/automation-list.model'
import {
  useOnWalletMetricUpdatedSubscription,
  useOnTokenMetricUpdatedSubscription,
} from '~/graphql/_generated-types'
import { parseError } from '~/common/parse-error'
import { toastsService } from '~/toasts'
import * as styles from './staking-automates.css'
import * as model from './staking-automates.model'
import { bignumberUtils } from '~/common/bignumber-utils'

export type StakingAutomatesProps = {
  className?: string
  protocolId?: string
}

const TIME = 15000

export const StakingAutomates: React.VFC<StakingAutomatesProps> = (props) => {
  const [openAdapter] = useDialog(StakingAdapterDialog)
  const [openErrorDialog] = useDialog(StakingErrorDialog)
  const wallet = walletNetworkModel.useWalletNetwork()
  const user = useStore(authModel.$user)
  const handleConnect = useWalletConnect()
  const [openConfirmDialog] = useDialog(ConfirmDialog)

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

  const handleChangeNetwork =
    (contract: typeof automatesContracts[number]) => async () => {
      try {
        await switchNetwork(contract.wallet.network)
      } catch {
        openErrorDialog({
          contractName: contract.contract?.name ?? '',
          address: contract.wallet.address,
          network: contract.wallet.network,
        }).catch(console.error)
      }
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

        await openAdapter({
          steps: adapter[action],
          onLastStep: () => {
            if (!contract.contract || !contract.contractWallet) return

            model
              .scanWalletMetricFx({
                walletId: contract.contractWallet.id,
                contractId: contract.contract.id,
              })
              .catch(console.error)
          },
        })
          .then(() => model.reset())
          .catch(() => model.reset())
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

  useGate(model.StakingAutomatesGate, props.protocolId ?? null)

  const subscriptionOptions = useMemo(() => {
    if (!user) return undefined

    return {
      variables: {
        user: [user.id],
      },
    }
  }, [user])

  const [walletUpdated] =
    useOnWalletMetricUpdatedSubscription(subscriptionOptions)
  const [tokenMetricUpdated] =
    useOnTokenMetricUpdatedSubscription(subscriptionOptions)

  const onWalletMetricUpdated = useThrottle(
    walletUpdated.data?.onWalletMetricUpdated.id || '',
    TIME
  )
  const onTokenMetricUpdated = useThrottle(
    tokenMetricUpdated.data?.onTokenMetricUpdated.id || '',
    TIME
  )

  useEffect(() => {
    if (onWalletMetricUpdated || onTokenMetricUpdated) {
      model.updated()
    }
  }, [onWalletMetricUpdated, onTokenMetricUpdated])

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

          const isNotSameAddresses =
            String(wallet?.chainId) === 'main'
              ? wallet?.account !== automatesContract.wallet.address
              : wallet?.account?.toLowerCase() !==
                automatesContract.wallet.address

          const wrongAddressesOrNetworks =
            isNotSameAddresses ||
            String(wallet?.chainId) !== automatesContract.wallet.network

          const migrate = wrongAddressesOrNetworks
            ? handleChangeNetwork(automatesContract)
            : handleAction(automatesContract, 'migrate')

          const deposit = wrongAddressesOrNetworks
            ? handleChangeNetwork(automatesContract)
            : handleAction(automatesContract, 'deposit')

          const refund = wrongAddressesOrNetworks
            ? handleChangeNetwork(automatesContract)
            : handleAction(automatesContract, 'refund')

          const run = wrongAddressesOrNetworks
            ? handleChangeNetwork(automatesContract)
            : handleRunManually(automatesContract)

          return (
            <StakingAutomatesContractCard
              key={automatesContract.id}
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
            />
          )
        })}
      </div>
    </div>
  )
}
