import { useState } from 'react'
import { useAsync, useAsyncFn, useAsyncRetry } from 'react-use'
import clsx from 'clsx'

import { Button } from '~/common/button'
import { Typography } from '~/common/typography'
import { InvestContractInfo } from '~/invest/common/invest-contract-info'
import { InvestContract } from '~/invest/common/invest.types'
import { InvestStepsProgress } from '~/invest/common/invest-steps-progress'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { analytics } from '~/analytics'
import { toastsService } from '~/toasts'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Restake, Position } from '~/common/load-adapter'
import { Select, SelectOption } from '~/common/select'
import { Paper } from '~/common/paper'
import { Icon } from '~/common/icon'
import * as styles from './invest-staking-steps.css'
import * as stakingAutomatesModel from '~/invest/invest-deployed-contracts/invest-deployed-contracts.model'

export type InvestStakingStepsStakeProps = {
  onSubmit?: (values: { txHash?: string }) => void
  createInvest?: (values: {
    txHash?: string
    tokenPriceUSD?: string
    amount: string
    amountInUSD: string
  }) => void
  contract: InvestContract
  deployedContract?: string
  isUniV3: boolean
  positions?: Position[]
}

export const InvestStakingStepsStake: React.FC<InvestStakingStepsStakeProps> = (
  props
) => {
  const currentWallet = walletNetworkModel.useWalletNetwork()

  const positionsId = props.positions?.[0]?.id ?? ''

  const [tokenId, setTokenId] = useState(String(positionsId))

  const adapter = useAsync(async () => {
    if (
      !currentWallet ||
      !props.contract.automate.autorestake ||
      !props.deployedContract ||
      props.isUniV3
    )
      return

    return stakingAutomatesModel.fetchAdapterFx({
      protocolAdapter: props.contract.protocol.adapter,
      contractAdapter: props.contract.automate.autorestake,
      contractId: props.contract.id,
      contractAddress: props.deployedContract,
      provider: currentWallet.provider,
      chainId: String(currentWallet.chainId),
      action: 'migrate',
    })
  }, [currentWallet, props.deployedContract, props.isUniV3])

  const adapterUniV3 = useAsync(async () => {
    if (
      !currentWallet ||
      !props.contract.automate.autorestake ||
      !props.deployedContract ||
      !props.isUniV3
    )
      return

    return stakingAutomatesModel.fetchAdapterFx({
      protocolAdapter: props.contract.protocol.adapter,
      contractAdapter: 'Restake',
      contractId: props.contract.id,
      contractAddress: props.deployedContract,
      provider: currentWallet.provider,
      chainId: String(currentWallet.chainId),
      action: 'migrate',
    }) as unknown as Promise<Restake | undefined>
  }, [currentWallet, props.deployedContract, props.isUniV3])

  const balanceOf = useAsync(async () => {
    if (!adapter.value) return

    return adapter.value.deposit.methods.balanceOf()
  }, [adapter.value])

  const tokenPriceUSD = useAsync(async () => {
    if (!adapter.value) return

    return adapter.value.deposit.methods.tokenPriceUSD()
  }, [adapter.value])

  const [depositState, onDeposit] = useAsyncFn(async () => {
    const currentAdapter = adapterUniV3.value ?? adapter.value
    const value = props.isUniV3 ? tokenId : balanceOf.value

    if (!currentAdapter || !value) return false
    analytics.log('auto_staking_migrate_dialog_deposit_click')

    const { deposit, canDeposit: canDepositMethod } =
      currentAdapter.deposit.methods

    try {
      const can = await canDepositMethod(value)

      if (can instanceof Error) throw can
      if (!can) throw new Error("can't deposit")

      const { tx } = await deposit(value)

      let amountInUSD = bignumberUtils.mul(balanceOf.value, tokenPriceUSD.value)

      const position = props.positions?.find(({ id }) => String(id) === tokenId)

      if (position && props.isUniV3) {
        amountInUSD = bignumberUtils.plus(
          position.token0.amountUSD,
          position.token1.amountUSD
        )
      }

      props.createInvest?.({
        txHash: tx.hash,
        tokenPriceUSD: tokenPriceUSD.value,
        amount: value,
        amountInUSD,
      })

      const result = await tx?.wait()

      props.onSubmit?.({
        txHash: result.transactionHash,
      })
      analytics.log('auto_staking_migrate_dialog_deposit_success')

      return true
    } catch (error) {
      if (error instanceof Error) {
        toastsService.error(error.message)
        analytics.log('auto_staking_migrate_dialog_deposit_failure')
      }

      return false
    }
  }, [
    adapter.value,
    balanceOf.value,
    tokenPriceUSD.value,
    adapterUniV3.value,
    props.isUniV3,
    props.positions,
    tokenId,
  ])

  const isApproved = useAsyncRetry(async () => {
    const isApprovedFn =
      adapter.value?.deposit.methods.isApproved ??
      adapterUniV3.value?.deposit.methods.isApproved

    const value = props.isUniV3 ? tokenId : balanceOf.value

    if (!value) return

    return isApprovedFn?.(value)
  }, [
    balanceOf.value,
    adapter.value,
    adapterUniV3.value,
    props.isUniV3,
    tokenId,
  ])

  const [approve, handleApprove] = useAsyncFn(async () => {
    const approveFn =
      adapter.value?.deposit.methods.approve ??
      adapterUniV3.value?.deposit.methods.approve

    const value = props.isUniV3 ? tokenId : balanceOf.value

    if (!approveFn || !value) return false

    try {
      const approveMethod = await approveFn(value)

      if (approveMethod instanceof Error) throw approveMethod

      const { tx } = approveMethod

      await tx?.wait()

      return true
    } catch (error) {
      if (error instanceof Error) {
        toastsService.error(error.message)
      }

      return false
    } finally {
      isApproved.retry()
    }
  }, [
    adapter.value,
    balanceOf.value,
    adapterUniV3.value,
    props.isUniV3,
    tokenId,
  ])

  const iconMap = props.contract.tokens.reward.reduce<Record<string, string>>(
    (acc, token) => {
      acc[token.symbol] = token.alias?.logoUrl ?? ''

      return acc
    },
    {}
  )

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
      {!props.isUniV3 && (
        <Typography align="center" className={styles.stakeHint}>
          To earn{' '}
          {props.contract.tokens.reward.map(({ symbol }) => symbol).join('-')}{' '}
          tokens as a reward - you need to stake your investment in{' '}
          {props.contract.protocol.name} protocol.
        </Typography>
      )}
      {props.isUniV3 && (
        <div className={styles.depositSelect}>
          <Select
            label="TOKEN"
            value={tokenId}
            onChange={({ target }) => setTokenId(target.value)}
          >
            {props.positions?.map((position) => {
              const token0Icon = iconMap[position.token0.symbol]

              const renderValue = (
                <>
                  {token0Icon ? (
                    <img alt="" src={token0Icon} className={styles.tokenIcon} />
                  ) : (
                    <Paper className={styles.tokenIcon}>
                      <Icon icon="unknownNetwork" width="16" height="16" />
                    </Paper>
                  )}
                  {props.contract.tokens.reward.map}
                  {position.token0.price.lower} - {position.token0.price.upper}{' '}
                  per {position.token1.symbol} - $
                  {bignumberUtils.format(
                    bignumberUtils.plus(
                      position.token0.amountUSD,
                      position.token1.amountUSD
                    )
                  )}
                </>
              )

              return (
                <SelectOption
                  value={String(position.id)}
                  key={position.id}
                  renderValue={renderValue}
                  className={styles.justifyContentStart}
                >
                  {renderValue}
                </SelectOption>
              )
            })}
          </Select>
        </div>
      )}
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
          {props.isUniV3 ? 'DEPOSIT TOKENS' : 'STAKE TOKENS'}
        </Button>
      </div>
    </>
  )
}
