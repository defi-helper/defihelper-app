import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { useEffect, useMemo } from 'react'
import isEmpty from 'lodash.isempty'
import { useThrottle } from 'react-use'

import { useDialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import { ConfirmDialog } from '~/common/confirm-dialog'
import {
  StakingContractCard,
  StakingAdapterDialog,
  StakingErrorDialog,
} from '~/staking/common'
import { switchNetwork } from '~/wallets/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { useWalletConnect } from '~/wallets/wallet-connect'
import * as styles from './staking-automates.css'
import * as model from './staking-automates.model'
import * as settingsWalletModel from '~/settings/settings-wallets/settings-wallets.model'
import * as automationsListModel from '~/automations/automation-list/automation-list.model'
import {
  useOnWalletMetricUpdatedSubscription,
  useOnTokenMetricUpdatedSubscription,
} from '~/graphql/_generated-types'

export type StakingAutomatesProps = {
  className?: string
  protocolId?: string
}

const TIME = 15000

export const StakingAutomates: React.VFC<StakingAutomatesProps> = (props) => {
  const [openAdapter] = useDialog(StakingAdapterDialog)
  const [openErrorDialog] = useDialog(StakingErrorDialog)
  const wallet = walletNetworkModel.useWalletNetwork()
  const wallets = useStore(settingsWalletModel.$wallets)
  const handleConnect = useWalletConnect()
  const [openConfirmDialog] = useDialog(ConfirmDialog)

  const automatesContracts = useStore(model.$automatesContracts)

  const currentAction = useStore(model.$action)
  const adapter = useStore(model.$adapter)

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
    (contract: typeof automatesContracts[number]) => () => {
      const changeNetwork = () =>
        switchNetwork(contract.wallet.network).catch(console.error)

      openErrorDialog({
        contractName: contract.contract?.name ?? '',
        address: contract.wallet.address,
        network: contract.wallet.network,
      })
        .then(changeNetwork)
        .catch(changeNetwork)
    }

  const handleAction =
    (contract: typeof automatesContracts[number], action: model.ActionType) =>
    async () => {
      try {
        if (!wallet?.account) return

        await model.fetchAdapterFx({
          protocolAdapter: contract.protocol.adapter,
          contractAdapter: contract.adapter,
          contractId: contract.id,
          contractAddress: contract.address,
          provider: wallet.provider,
          chainId: String(wallet.chainId),
          action,
        })

        await model.scanWalletMetricFx({
          walletId: contract.wallet.id,
          contractId: contract.id,
        })
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

  useGate(model.StakingAutomatesGate, props.protocolId ?? null)

  const walletIds = useMemo(() => wallets.map(({ id }) => id), [wallets])

  const [walletUpdated, onWalletMetricUpdated] =
    useOnWalletMetricUpdatedSubscription()
  const [tokenMetricUpdated, onTokenMetricUpdated] =
    useOnTokenMetricUpdatedSubscription()

  useEffect(() => {
    if (!walletIds.length) return

    const opts = {
      variables: {
        wallet: walletIds,
      },
    }

    onTokenMetricUpdated(opts)
    onWalletMetricUpdated(opts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletIds])

  const walletUpdatedId = useThrottle(
    walletUpdated.data?.onWalletMetricUpdated.id ?? '',
    TIME
  )
  const tokenMetricUpdatedId = useThrottle(
    tokenMetricUpdated.data?.onTokenMetricUpdated.id ?? '',
    TIME
  )

  useEffect(() => {
    if (walletUpdatedId || tokenMetricUpdatedId) {
      model.updated()
    }
  }, [walletUpdatedId, tokenMetricUpdatedId])

  useEffect(() => {
    if (!currentAction || !adapter || !adapter[currentAction]) return

    openAdapter({
      steps: adapter[currentAction],
    })
      .then(() => model.reset())
      .catch(() => model.reset())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAction, adapter])

  if (isEmpty(automatesContracts)) return <></>

  return (
    <div className={clsx(styles.root, props.className)}>
      <Typography variant="h3" className={styles.title}>
        Deployed automations
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

          return (
            <StakingContractCard
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
              onDelete={handleDelete(automatesContract.id)}
              refunding={automatesContract.refunding}
              migrating={automatesContract.migrating}
              depositing={automatesContract.depositing}
              deleting={automatesContract.deleting}
            />
          )
        })}
      </div>
    </div>
  )
}
