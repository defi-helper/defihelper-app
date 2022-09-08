import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useAsync, useAsyncFn, useAsyncRetry } from 'react-use'

import { Button } from '~/common/button'
import { Typography } from '~/common/typography'
import { InvestPoolTokens } from '~/invest/common/invest-pool-tokens'
import { InvestContract } from '~/invest/common/invest.types'
import { InvestStepsProgress } from '~/invest/common/invest-steps-progress'
import { bignumberUtils } from '~/common/bignumber-utils'
import { NumericalInput } from '~/common/numerical-input'
import { analytics } from '~/analytics'
import { toastsService } from '~/toasts'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as styles from './invest-migrate.css'
import * as model from '~/staking/staking-automates/staking-automates.model'

export type InvestMigrateProps = {
  onSubmit?: (transactionHash?: string) => void
  contract: InvestContract
}

export const InvestMigrate = (props: InvestMigrateProps) => {
  const [amount, setAmount] = useState('0')

  const currentWallet = walletNetworkModel.useWalletNetwork()

  const adapter = useAsync(async () => {
    if (!currentWallet) return

    return model.fetchAdapterFx({
      protocolAdapter: props.contract.protocol.adapter,
      contractAdapter: props.contract.adapter,
      contractId: props.contract.id,
      contractAddress: props.contract.address,
      provider: currentWallet.provider,
      chainId: String(currentWallet.chainId),
      action: 'migrate',
    })
  }, [currentWallet])

  const balanceOf = useAsyncRetry(async () => {
    return adapter.value?.migrate.methods?.balanceOf()
  }, [adapter.value])

  const canTransfer = useAsyncRetry(async () => {
    if (bignumberUtils.eq(amount, 0)) return true

    return adapter.value?.migrate.methods?.canTransfer(amount)
  }, [adapter.value, amount])

  const [transferState, onTransfer] = useAsyncFn(async () => {
    if (!adapter.value?.migrate) return false
    analytics.log('auto_staking_migrate_dialog_transfer_click')

    const { canTransfer: canTransferMethod, transfer } =
      adapter.value.migrate.methods

    try {
      const can = await canTransferMethod(amount)

      if (can instanceof Error) throw can
      if (!can) throw new Error("can't transfer")

      const { tx } = await transfer(amount)

      const result = await tx?.wait()
      analytics.log('auto_staking_migrate_dialog_transfer_success')

      props.onSubmit?.(result.transactionHash)

      return true
    } catch (error) {
      if (error instanceof Error) {
        toastsService.error(error.message)
        analytics.log('auto_staking_migrate_dialog_transfer_failure')
      }

      return false
    }
  }, [adapter.value])

  useEffect(() => {
    if (!balanceOf.value) return

    setAmount(balanceOf.value)
  }, [balanceOf.value])

  return (
    <React.Fragment>
      <InvestStepsProgress current={0} />
      <Typography
        family="mono"
        transform="uppercase"
        as="div"
        align="center"
        className={styles.title}
      >
        MIGRATE TOKENS
      </Typography>
      <div className={styles.row}>
        <Typography variant="body2" family="mono">
          Pool
        </Typography>
        <div className={styles.poolRight}>
          <InvestPoolTokens tokens={props.contract.tokens.stake} />
          {props.contract.name}
        </div>
      </div>
      <div className={styles.inputs}>
        <NumericalInput
          label="AMOUNT"
          className={styles.input}
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          disabled={transferState.loading}
        />
      </div>
      <div className={clsx(styles.stakeActions, styles.mt)}>
        <Button
          onClick={onTransfer}
          loading={transferState.loading}
          disabled={canTransfer.value instanceof Error}
          color="green"
        >
          MIGRATE TOKENS
        </Button>
      </div>
    </React.Fragment>
  )
}
