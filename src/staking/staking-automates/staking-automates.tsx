import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { useEffect, useMemo } from 'react'
import isEmpty from 'lodash.isempty'

import { useDialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import { ConfirmDialog } from '~/common/confirm-dialog'
import {
  StakingContractCard,
  StakingAutomatesDialog,
  StakingErrorDialog,
} from '~/staking/common'
import { switchNetwork } from '~/wallets/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { useWalletConnect } from '~/wallets/wallet-connect'
import * as styles from './staking-automates.css'
import * as model from './staking-automates.model'
import * as settingsWalletModel from '~/settings/settings-wallets/settings-wallets.model'
import {
  useOnWalletMetricUpdatedSubscription,
  useOnTokenMetricUpdatedSubscription,
} from '~/graphql/_generated-types'

export type StakingAutomatesProps = {
  className?: string
  protocolId?: string
}

export const StakingAutomates: React.VFC<StakingAutomatesProps> = (props) => {
  const [openAutomates] = useDialog(StakingAutomatesDialog)
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

      model.deleteContractFx(contractId)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleAction =
    (contract: typeof automatesContracts[number], action: model.ActionType) =>
    async () => {
      try {
        if (!wallet?.account) return

        await switchNetwork(contract.wallet.network)

        const addresses =
          String(wallet.chainId) === 'W'
            ? wallet.account !== contract.wallet.address
            : wallet.account.toLowerCase() !== contract.wallet.address

        if (addresses || String(wallet.chainId) !== contract.wallet.network) {
          await openErrorDialog({
            contractName: contract.contract?.name ?? '',
            address: contract.wallet.address,
            network: contract.wallet.network,
          })
        }

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
    const opts = {
      variables: {
        wallet: walletIds,
      },
    }

    onTokenMetricUpdated(opts)
    onWalletMetricUpdated(opts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletIds])

  useEffect(() => {
    if (walletUpdated.data || tokenMetricUpdated.data) {
      model.updated()
    }
  }, [walletUpdated.data, tokenMetricUpdated.data])

  useEffect(() => {
    if (!currentAction || !adapter || !adapter[currentAction]) return

    openAutomates({
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
        {automatesContracts.map((automatesContract) => (
          <StakingContractCard
            key={automatesContract.id}
            title={automatesContract.contract?.name ?? ''}
            address={automatesContract.address}
            network={automatesContract.contract?.network ?? ''}
            blockchain={automatesContract.contract?.blockchain ?? ''}
            balance={automatesContract.contractWallet?.metric.stakedUSD ?? ''}
            apy={automatesContract.contract?.metric.aprYear}
            apyBoost={automatesContract.contract?.metric.myAPYBoost}
            onMigrate={
              wallet
                ? handleAction(automatesContract, 'migrate')
                : () => handleConnect(automatesContract.contract?.blockchain)
            }
            onDeposit={
              wallet
                ? handleAction(automatesContract, 'deposit')
                : () => handleConnect(automatesContract.contract?.blockchain)
            }
            onRefund={
              wallet
                ? handleAction(automatesContract, 'refund')
                : () => handleConnect(automatesContract.contract?.blockchain)
            }
            onDelete={handleDelete(automatesContract.id)}
            refunding={automatesContract.refunding}
            migrating={automatesContract.migrating}
            depositing={automatesContract.depositing}
            deleting={automatesContract.deleting}
          />
        ))}
      </div>
    </div>
  )
}
