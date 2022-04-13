import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { useAsyncRetry, useAsyncFn } from 'react-use'
import { useEffect } from 'react'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { AdapterActions } from '~/common/load-adapter'
import { Typography } from '~/common/typography'
import { Link } from '~/common/link'
import { bignumberUtils } from '~/common/bignumber-utils'
import { toastsService } from '~/toasts'
import * as styles from './staking-claim-dialog.css'

type FormValues = {
  amount: string
}

export type StakingClaimDialogProps = {
  onConfirm: () => void
  methods?: AdapterActions['claim']['methods']
  onSubmit: () => void
}

export const StakingClaimDialog: React.FC<StakingClaimDialogProps> = (
  props
) => {
  const { formState, setValue, watch, handleSubmit } = useForm<FormValues>()

  const amount = watch('amount')

  const can = useAsyncRetry(async () => {
    if (bignumberUtils.eq(amount, 0)) return true

    return props.methods?.can(amount)
  }, [props.methods, amount])

  const [claimState, onClaim] = useAsyncFn(async (formValues: FormValues) => {
    if (!props.methods) return false

    const { can: canClaimMethod, claim } = props.methods

    try {
      const canClaim = await canClaimMethod(formValues.amount)

      if (canClaim instanceof Error) throw canClaim
      if (!canClaim) throw new Error("can't claim")

      const { tx } = await claim(formValues.amount)

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

  const balanceOf = useAsyncRetry(async () => {
    return props.methods?.balanceOf()
  }, [props.methods])

  useEffect(() => {
    if (!balanceOf.value) return

    setValue('amount', balanceOf.value)
  }, [balanceOf.value, setValue])

  useEffect(() => {
    if (claimState.value) {
      props.onConfirm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claimState.value])

  const handleOnSubmit = handleSubmit(onClaim)

  return (
    <Dialog className={styles.root}>
      <div className={styles.tabs}>
        <Typography
          variant="body3"
          transform="uppercase"
          family="mono"
          className={clsx(styles.title, styles.activeTab)}
        >
          Claim
        </Typography>
      </div>
      <div className={styles.description}>
        Claim your{' '}
        <Link href={props.methods?.link()} target="_blank" color="blue">
          {props.methods?.symbol()}
        </Link>{' '}
        reward
      </div>
      <form
        noValidate
        autoComplete="off"
        className={styles.form}
        onSubmit={handleOnSubmit}
      >
        <Button
          type="submit"
          loading={formState.isSubmitting}
          className={styles.button}
        >
          {can.value instanceof Error ? can.value.message : 'claim'}
        </Button>
      </form>
    </Dialog>
  )
}
