import clsx from 'clsx'
import { useForm, Controller } from 'react-hook-form'
import { useAsyncRetry, useAsyncFn } from 'react-use'
import { useEffect } from 'react'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { NumericalInput } from '~/common/numerical-input'
import { AdapterActions } from '~/common/load-adapter'
import { Link } from '~/common/link'
import { Typography } from '~/common/typography'
import { ButtonBase } from '~/common/button-base'
import { bignumberUtils } from '~/common/bignumber-utils'
import * as styles from './staking-unstake-dialog.css'
import { toastsService } from '~/toasts'

export type StakingUnstakeDialogProps = {
  onConfirm: () => void
  methods?: AdapterActions['unstake']['methods']
}

type FormValues = {
  amount: string
}

export const StakingUnstakeDialog: React.VFC<StakingUnstakeDialogProps> = (
  props
) => {
  const { control, formState, setValue, watch, handleSubmit } =
    useForm<FormValues>()

  const amount = watch('amount')

  const balanceOf = useAsyncRetry(async () => {
    return props.methods?.balanceOf()
  }, [props.methods])

  const can = useAsyncRetry(async () => {
    if (bignumberUtils.eq(amount, 0)) return true

    return props.methods?.can(amount)
  }, [props.methods, amount])

  const [unstakeState, onUnstake] = useAsyncFn(
    async (formValues: FormValues) => {
      if (!props.methods) return false

      const { can: canUnstakeMethod, unstake } = props.methods

      try {
        const canUnstake = await canUnstakeMethod(formValues.amount)

        if (canUnstake instanceof Error) throw canUnstake
        if (!canUnstake) throw new Error("can't unstake")

        const { tx } = await unstake(formValues.amount)

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

  const handleOnSubmit = handleSubmit(onUnstake)

  useEffect(() => {
    if (!balanceOf.value) return

    setValue('amount', balanceOf.value)
  }, [balanceOf.value, setValue])

  useEffect(() => {
    if (unstakeState.value) {
      props.onConfirm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unstakeState.value])

  return (
    <Dialog className={styles.root}>
      <div className={styles.tabs}>
        <Typography
          variant="body3"
          transform="uppercase"
          family="mono"
          className={clsx(styles.title, styles.activeTab)}
        >
          UNSTAKE
        </Typography>
      </div>
      <div className={styles.description}>
        Unstake your{' '}
        <Link href={props.methods?.link()} target="_blank" color="blue">
          {props.methods?.symbol()}
        </Link>{' '}
        tokens from contract
      </div>
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
              error={can.value instanceof Error}
              helperText={
                can.value instanceof Error ? can.value.message : undefined
              }
            />
          )}
        />
        <Button
          type="submit"
          loading={formState.isSubmitting}
          className={styles.button}
        >
          Unstake
        </Button>
      </form>
    </Dialog>
  )
}
