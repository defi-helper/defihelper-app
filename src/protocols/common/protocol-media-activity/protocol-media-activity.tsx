import clsx from 'clsx'
import { dateUtils } from '~/common/date-utils'

import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './protocol-media-activity.css'

export type ProtocolMediaActivityProps = {
  className?: string
}

const MEDIA_ACTIVITY = [
  {
    username: '@DeFiBonds',
    text: (
      <>
        Proposal for a new smart contract that will be buying back USDap from
        the market and burning them:
        https://bondappetit.io/governance/proposals/25
        <br />
        <br />
        The contract will serve as a price stabilization mechanism.
      </>
    ),
    date: '2021-09-27T11:05:49.927Z',
  },
  {
    username: '@BondAppetit',
    text: 'The First Batch of Bonds Has Been Acquired. Phase 2 Is Now Here',
    date: '2021-09-27T11:05:49.927Z',
  },
  {
    username: '@DeFiBonds',
    text: 'The First Batch of Bonds Has Been Acquired. Phase 2 Is Now Here',
    date: '2021-09-27T11:05:49.927Z',
  },
]

export const ProtocolMediaActivity: React.VFC<ProtocolMediaActivityProps> = (
  props
) => {
  return (
    <div className={clsx(styles.root, props.className)}>
      <Typography variant="h3" className={styles.title}>
        Recent Media Activity
      </Typography>
      <div className={styles.grid}>
        {MEDIA_ACTIVITY.map((activity, index) => (
          <Paper radius={8} key={String(index)} className={styles.card}>
            <Typography variant="body2" className={styles.cardUsername}>
              {activity.username}
            </Typography>
            <Typography className={styles.cardText}>{activity.text}</Typography>
            <Typography variant="body2" className={styles.cardDate}>
              {dateUtils.format(activity.date, 'DD MMM YY')}
            </Typography>
          </Paper>
        ))}
      </div>
    </div>
  )
}
