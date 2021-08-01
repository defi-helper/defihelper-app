import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useGate, useStore } from 'effector-react'
import { Effect } from 'effector'

import { MainLayout } from '~/layouts'
import { BillingForm } from './common'
import * as model from './billing.model'

export type BillingProps = {
  className?: string
}

const useStyles = makeStyles(() => ({
  form: {
    marginBottom: 30,
  },
}))

const createHandler =
  (effect: Effect<string, void, Error>) => (amount: string) => {
    effect(amount)
  }

export const Billing: React.VFC<BillingProps> = () => {
  const classes = useStyles()

  const refundStatus = useStore(model.refundFx.pending)
  const depositStatus = useStore(model.depositFx.pending)

  const refundKey = useStore(model.$refund)
  const depositKey = useStore(model.$deposit)

  const handleDeposit = createHandler(model.depositFx)

  const handleRefund = createHandler(model.refundFx)

  const balance = useStore(model.$billingBalance)

  useGate(model.BillingGate)

  return (
    <MainLayout>
      <Typography variant="h3">Deposit</Typography>
      <BillingForm
        className={classes.form}
        loading={depositStatus}
        onSubmit={handleDeposit}
        balance={balance?.netBalance}
        key={depositKey}
      />
      <Typography variant="h3">Refund</Typography>
      <BillingForm
        loading={refundStatus}
        onSubmit={handleRefund}
        balance={balance?.netBalance}
        key={refundKey}
      />
    </MainLayout>
  )
}
