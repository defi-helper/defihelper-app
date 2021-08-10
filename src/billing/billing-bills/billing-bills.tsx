import { Paper, Link, makeStyles } from '@material-ui/core'
import { useGate, useStore } from 'effector-react'

import { Typography } from '~/common/typography'
import { bignumberUtils } from '~/common/bignumber-utils'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { cutAccount } from '~/common/cut-account'
import { dateUtils } from '~/common/date-utils'
import * as model from './billing-bills.model'

export type BillingBillsProps = unknown

const useStyles = makeStyles({
  root: {
    margin: '10px 0',
  },

  item: {
    margin: '5px 0',
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },
})

export const BillingBills: React.VFC<BillingBillsProps> = () => {
  const classes = useStyles()

  const bills = useStore(model.$billingBills)
  const loading = useStore(model.fetchBillingBillsFx.pending)

  useGate(model.BillingBillsGate)

  return (
    <div className={classes.root}>
      <Typography>Bills</Typography>
      <Paper>
        {loading && 'loading...'}
        {!loading && !bills.length && 'bills not found'}
      </Paper>
      {!loading &&
        Boolean(bills.length) &&
        bills.map((bill) => (
          <Paper key={bill.id} className={classes.item}>
            <Link
              href={buildExplorerUrl({
                network: bill.network,
                address: bill.account,
              })}
              target="_blank"
            >
              {cutAccount(bill.account)}
            </Link>
            <div>{bill.blockchain}</div>
            <div>{bignumberUtils.format(bill.claim)}</div>
            <div>{bignumberUtils.format(bill.claimGasFee)}</div>
            <div>{bignumberUtils.format(bill.claimProtocolFee)}</div>
            <div>{bill.status}</div>
            <div>{dateUtils.format(bill.createdAt)}</div>
          </Paper>
        ))}
    </div>
  )
}
