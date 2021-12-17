import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { useEffect } from 'react'
import isEmpty from 'lodash.isempty'

import { useDialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import {
  StakingContractCard,
  StakingAutomatesDialog,
  StakingErrorDialog,
} from '~/staking/common'
import { useWalletList } from '~/wallets/wallet-list'
import * as styles from './staking-automates.css'
import * as model from './staking-automates.model'

export type StakingAutomatesProps = {
  className?: string
  protocolId?: string
}

export const StakingAutomates: React.VFC<StakingAutomatesProps> = (props) => {
  const [openAutomates] = useDialog(StakingAutomatesDialog)
  const [openWalletList] = useWalletList()
  const [openErrorDialog] = useDialog(StakingErrorDialog)

  const automatesContracts = useStore(model.$automatesContracts)

  const currentAction = useStore(model.$action)
  const adapter = useStore(model.$adapter)

  const handleAction =
    (contract: typeof automatesContracts[number], action: model.ActionType) =>
    async () => {
      try {
        const wallet = await openWalletList()

        if (!wallet.account) return

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

        model.fetchAdapter({
          protocolAdapter: contract.protocol.adapter,
          contractAdapter: contract.adapter,
          contractId: contract.id,
          contractAddress: contract.address,
          provider: wallet.provider,
          chainId: String(wallet.chainId),
          action,
        })
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

  useGate(model.StakingAutomatesGate, props.protocolId ?? null)

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
            apyBoost={automatesContract.autostaking}
            onMigrate={handleAction(automatesContract, 'migrate')}
            onDeposit={handleAction(automatesContract, 'deposit')}
            onRefund={handleAction(automatesContract, 'refund')}
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
