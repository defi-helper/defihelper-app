import { useAsync, useAsyncFn, useAsyncRetry } from 'react-use'
import { useStore } from 'effector-react'
import clsx from 'clsx'

import { Button } from '~/common/button'
import { Typography } from '~/common/typography'
import { InvestContractInfo } from '~/invest/common/invest-contract-info'
import { InvestContract } from '~/invest/common/invest.types'
import { InvestStepsProgress } from '~/invest/common/invest-steps-progress'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { analytics } from '~/analytics'
import { toastsService } from '~/toasts'
import { authModel } from '~/auth'
import * as styles from './invest-staking-steps.css'
import * as stakingAutomatesModel from '~/staking/staking-automates/staking-automates.model'

export type InvestStakingStepsStakeProps = {
  onSubmit?: (transactionHash?: string) => void
  contract: InvestContract
}

export const InvestStakingStepsStake: React.FC<InvestStakingStepsStakeProps> = (
  props
) => {
  const user = useStore(authModel.$user)
  const currentWallet = walletNetworkModel.useWalletNetwork()

  const adapter = useAsync(async () => {
    if (!user) return

    const deployedContracts =
      await stakingAutomatesModel.fetchAutomatesContractsFx({
        userId: user.id,
      })

    const deployedContract = deployedContracts.list.find(
      ({ contract: deployedStakingContract }) =>
        deployedStakingContract?.id === props.contract.id
    )

    if (
      !currentWallet ||
      !props.contract.automate.autorestake ||
      !deployedContract
    )
      return

    return stakingAutomatesModel.fetchAdapterFx({
      protocolAdapter: props.contract.protocol.adapter,
      contractAdapter: props.contract.automate.autorestake,
      contractId: props.contract.id,
      contractAddress: deployedContract.address,
      provider: currentWallet.provider,
      chainId: String(currentWallet.chainId),
      action: 'migrate',
    })
  }, [currentWallet])

  const balanceOf = useAsync(async () => {
    if (!adapter.value) return

    return adapter.value.deposit.methods.balanceOf()
  }, [adapter.value])

  const [depositState, onDeposit] = useAsyncFn(async () => {
    if (!adapter.value || !balanceOf.value) return false
    analytics.log('auto_staking_migrate_dialog_deposit_click')

    const { deposit, canDeposit: canDepositMethod } =
      adapter.value.deposit.methods

    try {
      const can = await canDepositMethod(balanceOf.value)

      if (can instanceof Error) throw can
      if (!can) throw new Error("can't deposit")

      const { tx } = await deposit(balanceOf.value)

      const result = await tx?.wait()

      props.onSubmit?.(result.transactionHash)
      analytics.log('auto_staking_migrate_dialog_deposit_success')

      return true
    } catch (error) {
      if (error instanceof Error) {
        toastsService.error(error.message)
        analytics.log('auto_staking_migrate_dialog_deposit_failure')
      }

      return false
    }
  }, [adapter.value, balanceOf.value])

  const isApproved = useAsyncRetry(async () => {
    if (!balanceOf.value) return

    return adapter.value?.deposit.methods.isApproved(balanceOf.value)
  }, [balanceOf.value, adapter.value])

  const [approve, handleApprove] = useAsyncFn(async () => {
    if (!adapter.value || !balanceOf.value) return false

    try {
      const can = await adapter.value.deposit.methods.approve(balanceOf.value)

      if (can instanceof Error) throw can
      if (!can) throw new Error("can't transfer")

      const { tx } = can

      await tx?.wait()

      isApproved.retry()

      return true
    } catch (error) {
      if (error instanceof Error) {
        toastsService.error(error.message)
      }

      return false
    }
  }, [adapter.value, balanceOf.value])

  return (
    <>
      <InvestStepsProgress success={1} current={2} />
      <Typography
        family="mono"
        transform="uppercase"
        as="div"
        align="center"
        className={styles.title}
      >
        STAKE TOKENS
      </Typography>
      <InvestContractInfo
        contract={props.contract}
        className={styles.contractInfo}
      />
      <Typography align="center" className={styles.stakeHint}>
        To earn{' '}
        {props.contract.tokens.reward.map(({ symbol }) => symbol).join('-')}{' '}
        tokens as a reward - you need to stake your investment in{' '}
        {props.contract.protocol.name} protocol.
      </Typography>
      <div className={clsx(styles.stakeActions, styles.mt)}>
        {!isApproved.value && (
          <Button
            color="green"
            onClick={handleApprove}
            loading={approve.loading}
          >
            Approve{' '}
            {props.contract.tokens.stake.map(({ symbol }) => symbol).join('-')}
          </Button>
        )}
        <Button
          onClick={onDeposit}
          color="green"
          loading={depositState.loading}
          disabled={approve.loading || !isApproved.value}
        >
          STAKE TOKENS
        </Button>
      </div>
    </>
  )
}
