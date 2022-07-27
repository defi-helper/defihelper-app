/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { useAsyncFn, useAsyncRetry } from 'react-use'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { Dialog, useDialog } from '~/common/dialog'
import { Link } from '~/common/link'
import { NumericalInput } from '~/common/numerical-input'
import { Typography } from '~/common/typography'
import { Icon } from '~/common/icon'
import { paths } from '~/paths'
import { history } from '~/common/history'
import { AutomatesType } from '~/common/load-adapter'
import { toastsService } from '~/toasts'
import { bignumberUtils } from '~/common/bignumber-utils'
import { StopTransactionDialog } from '~/common/stop-transaction-dialog'
import { Progress } from '~/common/progress'
import * as styles from './autostaking-tabs-dialog.css'

export type AutostakingTabsDialogProps = {
  onConfirm: () => void
  onCancel: () => void
  methods?: AutomatesType['migrate']['methods']
  onLastStep: (txHash?: string) => void
}

enum Tabs {
  transfer,
  deposit,
  success,
}

type FormValues = { amount: string }

export const AutostakingTabsDialog: React.VFC<AutostakingTabsDialogProps> = (
  props
) => {
  const { formState, control, handleSubmit, watch, setValue } =
    useForm<{ amount: string }>()

  const [openStopTransaction] = useDialog(StopTransactionDialog)

  const handleStopTransaction = () => {
    openStopTransaction()
      .then(props.onCancel)
      .catch((error) => console.error(error.message))
  }

  const [currentTab, setCurrentTab] = useState(Tabs.transfer)

  const amount = watch('amount')

  const balanceOf = useAsyncRetry(async () => {
    return props.methods?.balanceOf()
  }, [props.methods])

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

        const result = await tx?.wait()

        props.onLastStep(result.transactionHash)

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

      const result = await tx?.wait()

      balanceOf.retry()

      setCurrentTab(Tabs.success)

      props.onLastStep(result.transactionHash)

      return true
    } catch (error) {
      if (error instanceof Error) {
        toastsService.error(error.message)
      }

      return false
    }
  }, [])

  const handleChangeTab = (tab: Tabs) => () => {
    setCurrentTab(tab)
  }

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

  const handleConfirm = () => {
    props.onConfirm()
  }

  const handlers: Record<number, () => void> = {
    [Tabs.deposit]: onDeposit,
    [Tabs.success]: handleConfirm,
  }

  const handleClickBuy = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    props.onCancel()
    history.push(paths.LPTokens)
  }

  return (
    <Dialog
      className={styles.root}
      onClose={
        depositState.loading || transferState.loading || formState.isSubmitting
          ? handleStopTransaction
          : undefined
      }
    >
      <div className={styles.header}>
        <Typography
          variant="body2"
          transform="uppercase"
          className={clsx(
            styles.tab,
            currentTab === Tabs.transfer && styles.tabActive
          )}
          as={ButtonBase}
          onClick={handleChangeTab(Tabs.transfer)}
        >
          TRANSFER
        </Typography>
        <Typography
          variant="body2"
          transform="uppercase"
          className={clsx(
            styles.tab,
            (currentTab === Tabs.deposit || currentTab === Tabs.success) &&
              styles.tabActive
          )}
          as={ButtonBase}
          onClick={handleChangeTab(Tabs.deposit)}
        >
          Deposit
        </Typography>
      </div>
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <div className={styles.content}>
          {currentTab === Tabs.transfer && (
            <>
              <Typography variant="body2" className={styles.subtitle}>
                Transfer your token{' '}
                {false && (
                  <Link color="blue" href="/">
                    APE-LP
                  </Link>
                )}
                tokens to your personal contract to enable automation.
              </Typography>
              {!transferState.loading && (
                <>
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
                              onClick={() =>
                                setValue('amount', balanceOf.value ?? '0')
                              }
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
                  <Typography variant="body2">
                    Don&apos;t have LP tokens? Buy LP tokens (ZAP) from a single
                    token{' '}
                    <Link color="blue" onClick={handleClickBuy} href="#">
                      in 1 click
                    </Link>
                  </Typography>
                </>
              )}
              <Progress loading={transferState.loading} />
            </>
          )}
          {currentTab === Tabs.deposit && (
            <>
              <Typography variant="body2" className={styles.subtitle}>
                To start earning rewards you need to stake your tokens to the
                protocol&apos;s contract.
              </Typography>
              <Progress loading={depositState.loading} />
            </>
          )}
          {currentTab === Tabs.success && (
            <div className={styles.success}>
              <Icon
                icon="checkboxCircle"
                width="100"
                height="100"
                className={styles.successIcon}
              />
              <Typography align="center">
                Your succesfully deposited your tokens! DeFiHelper will start to
                run your automation soon.
              </Typography>
            </div>
          )}
        </div>
        <Button
          type={currentTab === Tabs.transfer ? 'submit' : 'button'}
          size="small"
          className={styles.button}
          onClick={handlers[currentTab]}
        >
          {currentTab === Tabs.transfer && 'Transfer'}
          {currentTab === Tabs.deposit && 'Deposit'}
          {currentTab === Tabs.success && 'ok'}
        </Button>
      </form>
    </Dialog>
  )
}
