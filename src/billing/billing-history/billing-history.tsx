import { Link, makeStyles, Paper, Typography } from '@material-ui/core'
import { useGate, useStore } from 'effector-react'

import { bignumberUtils } from '~/common/bignumber-utils'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { cutAccount } from '~/common/cut-account'
import { dateUtils } from '~/common/date-utils'
import * as model from './billing-history.model'

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

export type BillingHistoryProps = unknown

export const BillingHistory: React.VFC<BillingHistoryProps> = () => {
  const classes = useStyles()

  const billingHistory = useStore(model.$billingHistory)
  const loading = useStore(model.fetchBillingHistoryFx.pending)

  useGate(model.BillingHistoryGate)

  return (
    <div className={classes.root}>
      <Typography>history</Typography>
      <Paper>
        {loading && 'loading...'}
        {!loading && !billingHistory.length && 'history not found'}
      </Paper>
      {!loading &&
        Boolean(billingHistory.length) &&
        billingHistory.map((transfer) => (
          <Paper key={transfer.id} className={classes.item}>
            <Link
              href={buildExplorerUrl({
                network: transfer.network,
                address: transfer.account,
              })}
              target="_blank"
            >
              {cutAccount(transfer.account)}
            </Link>
            <div>{transfer.blockchain}</div>
            <div>{bignumberUtils.format(transfer.amount)}</div>
            <div>{dateUtils.format(transfer.createdAt)}</div>
          </Paper>
        ))}
      <model.BillingHistoryPagination />
    </div>
  )
}
