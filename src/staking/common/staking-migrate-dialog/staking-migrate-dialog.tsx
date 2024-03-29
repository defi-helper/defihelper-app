import clsx from 'clsx'
import { useAsyncRetry, useAsyncFn } from 'react-use'
import { useForm, Controller } from 'react-hook-form'
import { useEffect, useState, cloneElement } from 'react'

import { Button } from '~/common/button'
import { Dialog, useDialog } from '~/common/dialog'
import { NumericalInput } from '~/common/numerical-input'
import { AutomatesType } from '~/common/load-adapter'
import { Typography } from '~/common/typography'
import { ButtonBase } from '~/common/button-base'
import { toastsService } from '~/toasts'
import { StopTransactionDialog } from '~/common/stop-transaction-dialog'
import { analytics } from '~/analytics'
import * as styles from './staking-migrate-dialog.css'
import { bignumberUtils } from '~/common/bignumber-utils'

type FormValues = {
  amount: string
}

export type StakingMigrateDialogProps = {
  onConfirm: () => void
  methods?: AutomatesType['migrate']['methods']
  onLastStep: (values: {
    txHash?: string
    tokenPriceUSD?: string
    amount: string
    amountInUSD: string
  }) => void
  onCancel: () => void
}

enum Tabs {
  withdraw = 'withdraw',
  transfer = 'transfer',
  deposit = 'deposit',
}

const tabs = {
  [Tabs.withdraw]: {
    title: 'Withdraw',
    description: 'Withdraw your tokens from staking',
  },
  [Tabs.transfer]: {
    title: 'Transfer',
    description: 'Transfer your tokens to your contract',
  },
  [Tabs.deposit]: {
    title: 'Deposit',
    description: 'Stake your tokens to the contract',
  },
} as const

export const StakingMigrateDialog: React.VFC<StakingMigrateDialogProps> = (
  props
) => {
  const [currentTab, setCurrentTab] = useState(Tabs.withdraw)

  const { control, formState, setValue, watch, handleSubmit } =
    useForm<FormValues>()

  const balanceOf = useAsyncRetry(async () => {
    return props.methods?.balanceOf()
  }, [props.methods])

  const tokenPriceUSD = useAsyncRetry(async () => {
    return props.methods?.tokenPriceUSD()
  }, [props.methods])

  const amount = watch('amount')

  const handleChangeTab = (tab: Tabs) => () => {
    setCurrentTab(tab)
  }

  const [openStopTransaction] = useDialog(StopTransactionDialog)

  const handleStopTransaction = () => {
    openStopTransaction()
      .then(props.onCancel)
      .catch((error) => console.error(error.message))
  }

  const [transferState, onTransfer] = useAsyncFn(
    async (formValues: FormValues) => {
      if (!props.methods) return false
      analytics.log('auto_staking_migrate_dialog_transfer_click')

      const { approve } = props.methods

      try {
        const can = await approve(formValues.amount)

        if (can instanceof Error) throw can
        if (!can) throw new Error("can't transfer")

        const { tx } = can

        await tx?.wait()
        analytics.log('auto_staking_migrate_dialog_transfer_success')

        return true
      } catch (error) {
        if (error instanceof Error) {
          toastsService.error(error.message)
          analytics.log('auto_staking_migrate_dialog_transfer_failure')
        }

        return false
      }
    },
    []
  )

  const [depositState, onDeposit] = useAsyncFn(async () => {
    if (!props.methods) return false
    analytics.log('auto_staking_migrate_dialog_deposit_click')

    const { deposit, canDeposit: canDepositMethod } = props.methods

    try {
      const can = await canDepositMethod(amount)

      if (can instanceof Error) throw can
      if (!can) throw new Error("can't deposit")

      const { tx } = await deposit(amount)

      const result = await tx?.wait()

      balanceOf.retry()

      props.onLastStep({
        txHash: result.transactionHash,
        amount,
        tokenPriceUSD: tokenPriceUSD.value,
        amountInUSD: bignumberUtils.mul(amount, tokenPriceUSD.value),
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
  }, [amount, tokenPriceUSD.value])

  const [withdrawState, onWithdraw] = useAsyncFn(async () => {
    if (!props.methods) return false

    analytics.log('auto_staking_migrate_dialog_withdraw_click')
    const { withdraw, canWithdraw: canWithdrawMethod } = props.methods

    try {
      const can = await canWithdrawMethod()

      if (can instanceof Error) throw can
      if (!can) throw new Error("can't withdraw")

      const { tx } = await withdraw()

      const result = await tx?.wait()

      analytics.log('auto_staking_migrate_dialog_withdraw_success')
      props.onLastStep({
        txHash: result.transactionHash,
        amount,
        tokenPriceUSD: tokenPriceUSD.value,
        amountInUSD: bignumberUtils.mul(amount, tokenPriceUSD.value),
      })

      return true
    } catch (error) {
      if (error instanceof Error) {
        toastsService.error(error.message)
        analytics.log('auto_staking_migrate_dialog_withdraw_failure')
      }

      return false
    }
  }, [])

  const transferred = useAsyncRetry(async () => {
    return props.methods?.isApproved(amount)
  }, [props.methods, amount])

  const handleOnSubmit = handleSubmit(onTransfer)

  useEffect(() => {
    if (!balanceOf.value) return

    setValue('amount', balanceOf.value)
  }, [balanceOf.value, setValue])

  useEffect(() => {
    if (transferState.value) {
      setCurrentTab(Tabs.deposit)
    }

    const timeout = setTimeout(() => {
      if (transferState.value) {
        balanceOf.retry()
        transferred.retry()
      }
    }, 1000)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferState.value])

  useEffect(() => {
    if (withdrawState.value) {
      setCurrentTab(Tabs.transfer)
      balanceOf.retry()
      transferred.retry()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withdrawState.value])

  useEffect(() => {
    if (depositState.value) {
      props.onConfirm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositState.value])

  const button = (
    <Button
      type="submit"
      loading={formState.isSubmitting}
      className={styles.button}
    >
      {tabs[currentTab].title}
    </Button>
  )

  return (
    <Dialog
      className={styles.root}
      onClose={
        transferState.loading || withdrawState.loading || depositState.loading
          ? handleStopTransaction
          : undefined
      }
    >
      <div className={styles.tabs}>
        {Object.entries(tabs).map(([tabName, tab]) => (
          <Typography
            variant="body3"
            transform="uppercase"
            family="mono"
            className={clsx(
              styles.title,
              currentTab === tabName && styles.activeTab
            )}
            as={ButtonBase}
            key={tab.title}
            onClick={handleChangeTab(tabName as Tabs)}
          >
            {tab.title}
          </Typography>
        ))}
      </div>
      <div className={styles.description}>{tabs[currentTab].description}</div>
      {currentTab === Tabs.transfer && (
        <form
          noValidate
          autoComplete="off"
          className={styles.form}
          onSubmit={handleOnSubmit}
        >
          <Controller
            control={control}
            name="amount"
            render={({ field }) => (
              <NumericalInput
                label={
                  <>
                    Amount
                    <ButtonBase
                      className={styles.balance}
                      onClick={() => setValue('amount', balanceOf.value ?? '0')}
                    >
                      {balanceOf.value ?? '0'} MAX
                    </ButtonBase>
                  </>
                }
                disabled={formState.isSubmitting}
                className={styles.input}
                {...field}
                value={field.value || '0'}
                error={transferState.error instanceof Error}
                helperText={
                  transferState.error instanceof Error
                    ? transferState.error.message
                    : undefined
                }
              />
            )}
          />
          {button}
        </form>
      )}
      {currentTab === Tabs.withdraw &&
        cloneElement(button, {
          onClick: onWithdraw,
          loading: withdrawState.loading,
        })}
      {currentTab === Tabs.deposit && (
        <>
          <Typography variant="body2">
            Transferred: {transferred.value}
          </Typography>
          {cloneElement(button, {
            onClick: onDeposit,
            loading: depositState.loading,
          })}
        </>
      )}
    </Dialog>
  )
}
