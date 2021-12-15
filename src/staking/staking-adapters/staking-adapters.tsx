import { useGate, useStore } from 'effector-react'

import { StakingAdapterForm, StakingAdapterFormProps } from '~/staking/common'
import { useWalletList } from '~/wallets/wallet-list'
import { Button } from '~/common/button'
import { useDialog } from '~/common/dialog'
import { bignumberUtils } from '~/common/bignumber-utils'
import * as model from './staking-adapters.model'
import * as styles from './staking-adapters.css'

export type StakingAdaptersProps = {
  className?: string
  contractAddress: string
  contractAdapter: string
  protocolAdapter: string
  poolName: string
  contractLayout: string
  contractId: string
  blockchain: string
  network: string
}

const FORM_LAYOUTS: Record<
  string,
  React.ElementType<StakingAdapterFormProps>
> = {
  staking: StakingAdapterForm,
}

export const StakingAdapters: React.VFC<StakingAdaptersProps> = (props) => {
  const [openWalletList] = useWalletList()
  const [openAdapterForm] = useDialog(FORM_LAYOUTS[props.contractLayout])

  const contractLoading = useStore(model.fetchContractAdapterFx.pending)

  const createAdapterAction =
    (action?: model.ContractAction['action']) => async () => {
      try {
        const wallet = await openWalletList({
          blockchain: props.blockchain,
        })

        if (!wallet.account) return

        const contract = await model.fetchContractAdapterFx({
          protocolAdapter: props.protocolAdapter,
          contract: {
            address: props.contractAddress,
            adapter: props.contractAdapter,
          },
          chainId: String(wallet.chainId),
          account: wallet.account,
          provider: wallet.provider,
        })

        const tokens = await model.fetchTokensFx({
          addresses: [
            ...Object.keys(contract.wallet?.earned ?? {}),
            ...Object.keys(contract.wallet?.staked ?? {}),
            ...Object.keys(contract.wallet?.tokens ?? {}),
          ],
        })

        let amount = Object.values(contract.wallet?.earned ?? {}).reduce(
          (acc, { balance }) => bignumberUtils.plus(acc, balance),
          '0'
        )

        if (action === 'stake') {
          amount = await openAdapterForm({
            metrics: contract.metrics,
            reward: contract.reward,
            staking: contract.staking,
            wallet: contract.wallet,
            tokens,
            poolName: props.poolName,
          })
        }

        model.contractAction({
          action,
          amount,
          contractAddress: props.contractAddress,
          actions: contract?.actions ?? undefined,
          decimals: contract?.staking.decimals,
          contractId: props.contractId,
          wallet: {
            ...wallet,
            account: wallet.account,
            chainId: String(wallet.chainId),
          },
        })
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

  const handleClaim = createAdapterAction('claim')
  const handleStake = createAdapterAction('stake')
  const handleUnStake = createAdapterAction('unstake')
  const handleExit = createAdapterAction('exit')

  const actions = useStore(model.$actions)
  const action = actions[props.contractAddress]

  useGate(model.StakingAdaptersGate)

  return (
    <div className={styles.root}>
      <div className={styles.stake}>
        <Button
          type="submit"
          onClick={handleStake}
          disabled={action?.disabled}
          loading={action?.stake || contractLoading}
          size="small"
          variant="outlined"
        >
          Stake
        </Button>
      </div>
      <div className={styles.unstake}>
        <Button
          type="submit"
          onClick={handleUnStake}
          disabled={action?.disabled}
          loading={action?.unstake || contractLoading}
          size="small"
          variant="outlined"
        >
          Unstake
        </Button>
      </div>
      <div className={styles.claim}>
        <Button
          onClick={handleClaim}
          disabled={action?.disabled}
          loading={action?.claim || contractLoading}
          size="small"
          variant="outlined"
        >
          Claim
        </Button>
      </div>
      {false && (
        <div>
          <Button
            onClick={handleExit}
            disabled={action?.disabled}
            loading={action?.exit || contractLoading}
            size="small"
            variant="outlined"
          >
            {action?.exit ? 'loading...' : 'Exit'}
          </Button>
        </div>
      )}
    </div>
  )
}
