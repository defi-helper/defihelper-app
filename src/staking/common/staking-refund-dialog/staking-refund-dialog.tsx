import clsx from 'clsx'
import { useAsyncFn, useAsyncRetry } from 'react-use'
import { useEffect } from 'react'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { AutomatesType } from '~/common/load-adapter'
import { Typography } from '~/common/typography'
import { toastsService } from '~/toasts'
import { bignumberUtils } from '~/common/bignumber-utils'
import * as styles from './staking-refund-dialog.css'

export type StakingRefundDialogProps = {
  onConfirm: () => void
  methods?: AutomatesType['refund']['methods']
  onLastStep: () => void
}

export const StakingRefundDialog: React.VFC<StakingRefundDialogProps> = (
  props
) => {
  const staked = useAsyncRetry(async () => {
    return props.methods?.staked()
  }, [props.methods])

  const [refundState, onRefund] = useAsyncFn(async () => {
    if (!props.methods) return false

    const { can, refund } = props.methods

    try {
      const canRefund = await can()

      if (canRefund instanceof Error) throw canRefund
      if (!canRefund) throw new Error("can't refund")

      const { tx } = await refund()

      await tx?.wait()

      staked.retry()

      props.onLastStep()

      return true
    } catch (error) {
      if (error instanceof Error) {
        toastsService.error(error.message)
      }

      return false
    }
  }, [])

  useEffect(() => {
    if (refundState.value) {
      props.onConfirm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refundState.value])

  return (
    <Dialog className={styles.root}>
      <div className={styles.tabs}>
        <Typography
          variant="body3"
          transform="uppercase"
          family="mono"
          className={clsx(styles.title, styles.activeTab)}
        >
          Refund
        </Typography>
      </div>
      <div className={styles.description}>
        Transfer your tokens from automate
      </div>
      <Typography variant="body2">
        Balance: {bignumberUtils.format(staked.value)}
      </Typography>
      <Button
        loading={refundState.loading}
        className={styles.button}
        onClick={onRefund}
      >
        Refund
      </Button>
    </Dialog>
  )
}
