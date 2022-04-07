import clsx from 'clsx'
import { useAsyncRetry, useAsyncFn } from 'react-use'
import { useForm, Controller } from 'react-hook-form'
import { useEffect, useState, cloneElement } from 'react'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { NumericalInput } from '~/common/numerical-input'
import { AutomatesType } from '~/common/load-adapter'
import { Typography } from '~/common/typography'
import { ButtonBase } from '~/common/button-base'
import { toastsService } from '~/toasts'
import { bignumberUtils } from '~/common/bignumber-utils'
import * as styles from './staking-migrate-dialog.css'

type FormValues = {
  amount: string
}

export type StakingMigrateDialogProps = {
  onConfirm: () => void
  methods?: AutomatesType['migrate']['methods']
  onLastStep: () => void
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

  const amount = watch('amount')

  const handleChangeTab = (tab: Tabs) => () => {
    setCurrentTab(tab)
  }

  const canTransfer = useAsyncRetry(async () => {
    if (bignumberUtils.eq(amount, 0)) return true

    return props.methods?.canTransfer(amount)
  }, [props.methods, amount])

  const [transferState, onTransfer] = useAsyncFn(
    async (formValues: FormValues) => {
      if (!props.methods) return false

      const { canTransfer: canTransferMethod, transfer } = props.methods

      try {
        const can = await canTransferMethod(formValues.amount)

        if (can instanceof Error) throw can
        if (!can) throw new Error("can't transfer")

        const { tx } = await transfer(formValues.amount)

        await tx?.wait()

        return true
      } catch (error) {
        if (error instanceof Error) {
          toastsService.error(error.message)
        }

        return false
      }
    },
    []
  )

  const [depositState, onDeposit] = useAsyncFn(async () => {
    if (!props.methods) return false

    const { deposit, canDeposit: canDepositMethod } = props.methods

    try {
      const can = await canDepositMethod()

      if (can instanceof Error) throw can
      if (!can) throw new Error("can't deposit")

      const { tx } = await deposit()

      await tx?.wait()

      balanceOf.retry()

      props.onLastStep()

      return true
    } catch (error) {
      if (error instanceof Error) {
        toastsService.error(error.message)
      }

      return false
    }
  }, [])

  const [withdrawState, onWithdraw] = useAsyncFn(async () => {
    if (!props.methods) return false

    const { withdraw, canWithdraw: canWithdrawMethod } = props.methods

    try {
      const can = await canWithdrawMethod()

      if (can instanceof Error) throw can
      if (!can) throw new Error("can't withdraw")

      const { tx } = await withdraw()

      await tx?.wait()

      balanceOf.retry()

      return true
    } catch (error) {
      if (error instanceof Error) {
        toastsService.error(error.message)
      }

      return false
    }
  }, [])

  const transferred = useAsyncRetry(async () => {
    return props.methods?.transferred()
  }, [props.methods])

  const handleOnSubmit = handleSubmit(onTransfer)

  useEffect(() => {
    if (!balanceOf.value) return

    setValue('amount', balanceOf.value)
  }, [balanceOf.value, setValue])

  useEffect(() => {
    if (transferState.value) {
      setCurrentTab(Tabs.deposit)
      transferred.retry()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferState.value])

  useEffect(() => {
    if (withdrawState.value) {
      setCurrentTab(Tabs.transfer)
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
    <Dialog className={styles.root}>
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
                error={canTransfer.value instanceof Error}
                helperText={
                  canTransfer.value instanceof Error
                    ? canTransfer.value.message
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
            Transferred: {bignumberUtils.format(transferred.value)}
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