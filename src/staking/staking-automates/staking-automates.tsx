import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { useEffect } from 'react'
import { ConfirmDialog } from '~/common/confirm-dialog'

import { useDialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import { StakingContractCard, StakingAutomatesDialog } from '~/staking/common'
import { useWalletList } from '~/wallets/wallet-list'
import * as styles from './staking-automates.css'
import * as model from './staking-automates.model'

export type StakingAutomatesProps = {
  className?: string
}

export const StakingAutomates: React.VFC<StakingAutomatesProps> = (props) => {
  const [openAutomates] = useDialog(StakingAutomatesDialog)
  const [openWalletList] = useWalletList()
  const [openConfirmDialog] = useDialog(ConfirmDialog)

  const automatesContracts = useStore(model.$automatesContracts)

  const currentAction = useStore(model.$action)
  const adapter = useStore(model.$adapter)

  const handleAction =
    (contract: typeof automatesContracts[number], action: model.ActionType) =>
    async () => {
      try {
        const wallet = await openWalletList()

        if (!wallet.account) return

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

  const handleRename = () => () => {
    model.renameContractFx()
  }

  useGate(model.StakingAutomatesGate)

  useEffect(() => {
    if (!currentAction || !adapter || !adapter[currentAction]) return

    openAutomates({
      steps: adapter[currentAction],
    })
      .then(() => model.reset())
      .catch(() => model.reset())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAction, adapter])

  return (
    <div className={clsx(styles.root, props.className)}>
      <Typography variant="h3" className={styles.title}>
        Deployed automates
      </Typography>
      <div className={styles.list}>
        {automatesContracts.map((automatesContract) => (
          <StakingContractCard
            key={automatesContract.id}
            title={automatesContract.contract?.name ?? ''}
            address={automatesContract.address}
            network={automatesContract.contract?.network ?? ''}
            blockchain={automatesContract.contract?.blockchain ?? ''}
            value="10"
            apy={automatesContract.contract?.metric.aprYear}
            apyBoost={10}
            onDelete={handleDelete(automatesContract.id)}
            onRename={handleRename()}
            onMigrate={handleAction(automatesContract, 'migrate')}
            onDeposit={handleAction(automatesContract, 'deposit')}
            onRefund={handleAction(automatesContract, 'refund')}
            refunding={automatesContract.refunding}
            migrating={automatesContract.migrating}
            depositing={automatesContract.depositing}
            deleting={automatesContract.deleting}
            editing={automatesContract.editing}
          />
        ))}
      </div>
    </div>
  )
}
