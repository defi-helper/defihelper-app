import clsx from 'clsx'
import { useAsyncRetry, useAsyncFn } from 'react-use'
import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { NumericalInput } from '~/common/numerical-input'
import { GovernanceStake } from '~/common/load-adapter'
import { Link } from '~/common/link'
import { Typography } from '~/common/typography'
import { ButtonBase } from '~/common/button-base'
import { bignumberUtils } from '~/common/bignumber-utils'
import { toastsService } from '~/toasts'
import * as styles from './staking-gov-stake-dialog.css'

type FormValues = {
  amount: string
}

export type StakingGovStakeDialogProps = {
  onConfirm: () => void
  methods?: GovernanceStake['methods']
  onSubmit: () => void
}

export const StakingGovStakeDialog: React.VFC<StakingGovStakeDialogProps> = (
  props
) => {
  const { control, formState, setValue, watch, handleSubmit } =
    useForm<FormValues>()

  const balanceOf = useAsyncRetry(async () => {
    return props.methods?.balanceOf()
  }, [props.methods])

  const amount = watch('amount')

  const isApproved = useAsyncRetry(async () => {
    if (bignumberUtils.eq(amount, 0)) return true

    return props.methods?.isApproved(amount)
  }, [props.methods, amount])

  const can = useAsyncRetry(async () => {
    if (bignumberUtils.eq(amount, 0)) return true

    return props.methods?.can(amount)
  }, [props.methods, amount])

  const [stakeState, onStake] = useAsyncFn(async (formValues: FormValues) => {
    if (!props.methods) return false

    const { can: canStakeMethod, stake } = props.methods

    try {
      const canStake = await canStakeMethod(formValues.amount)

      if (canStake instanceof Error) throw canStake
      if (!canStake) throw new Error("can't stake")

      const { tx } = await stake(formValues.amount)

      await tx?.wait()

      props.onSubmit()

      return true
    } catch (error) {
      if (error instanceof Error) {
        toastsService.error(error.message)
      }

      return false
    }
  }, [])

  const [approveState, onApprove] = useAsyncFn(
    async (formValues: FormValues) => {
      if (!props.methods) return false

      const { approve } = props.methods

      try {
        const { tx } = await approve(formValues.amount)

        await tx?.wait()

        balanceOf.retry()
        toastsService.info('tokens approved!')

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

  const handleOnSubmit = handleSubmit(async (formValues) => {
    if (isApproved.value === true) {
      await onStake(formValues)
    }

    if (isApproved.value === false || isApproved.error instanceof Error) {
      await onApprove(formValues)
    }
  })

  useEffect(() => {
    if (stakeState.value) {
      props.onConfirm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakeState.value])

  useEffect(() => {
    if (!balanceOf.value) return

    setValue('amount', balanceOf.value)
  }, [balanceOf.value, setValue])

  useEffect(() => {
    if (isApproved.value === false) {
      isApproved.retry()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApproved.value, approveState.value, amount])

  return (
    <Dialog className={styles.root}>
      <div className={styles.tabs}>
        <Typography
          variant="body3"
          transform="uppercase"
          family="mono"
          className={clsx(styles.title, styles.activeTab)}
        >
          STAKE
        </Typography>
      </div>
      <div className={styles.description}>
        Swap your{' '}
        <Link href={props.methods?.fromLink()} target="_blank" color="blue">
          {props.methods?.fromSymbol()}
        </Link>{' '}
        tokens to{' '}
        <Link href={props.methods?.toLink()} target="_blank" color="blue">
          {props.methods?.toSymbol()}
        </Link>
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
              error={!isApproved.value || can.value instanceof Error}
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
          {isApproved.value === true && 'Stake'}
          {isApproved.value === false && 'Approve'}
        </Button>
      </form>
    </Dialog>
  )
}
