import clsx from 'clsx'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Typography } from '~/common/typography'
import * as styles from './governance-vote-info.css'

export type GovernanceVoteInfoProps = {
  variant: 'for' | 'against' | 'abstain'
  active?: boolean
  onAddresses?: () => void
  count?: string
  total?: string
  className?: string
}

export const GovernanceVoteInfo: React.FC<GovernanceVoteInfoProps> = (
  props
) => {
  const percentage = bignumberUtils.getPercentage(props.count, props.total)

  return (
    <div
      className={clsx(
        styles.root,
        props.active && styles.active,
        props.className
      )}
    >
      {props.active && (
        <Typography variant="body2" as="div" className={styles.voted}>
          voted
        </Typography>
      )}
      <Typography variant="h3" as="div">
        {percentage}% voted {props.variant}
      </Typography>
      <div
        className={clsx(
          styles.percentage,
          styles.percentageVariants[props.variant]
        )}
        style={{ width: `${percentage || 3}%` }}
      />
      <Typography variant="body1" as="div">
        {bignumberUtils.format(props.count)} votes
      </Typography>
    </div>
  )
}
