import clsx from 'clsx'
import { Link as ReactRouterLink } from 'react-router-dom'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { config } from '~/config'
import { ProtocolQuery } from '~/api/_generated-types'
import { paths } from '~/paths'
import * as styles from './protocol-total.css'

export type ProtocolTotalProps = Exclude<
  ProtocolQuery['protocol'],
  null | undefined
>['metric'] & {
  hasAutostaking: boolean
  className?: string
  readonly?: boolean
}

const PercentChangeRender: React.FC<{ value: string }> = ({ value }) => {
  const calculated = bignumberUtils.format(
    bignumberUtils.mul(bignumberUtils.minus(value, 1), 100),
    2,
    false
  )

  const rawContibutedPercent = bignumberUtils.floor(
    bignumberUtils.mul(bignumberUtils.minus(value, 1), 100)
  )
  const isPositive = bignumberUtils.gte(rawContibutedPercent, 0)

  if (bignumberUtils.isZero(bignumberUtils.floor(value))) {
    return <span className={styles.changePlus}>+0%</span>
  }

  return (
    <span className={isPositive ? styles.changePlus : styles.changeMinus}>
      {isPositive && '+'}
      {calculated}%
    </span>
  )
}

export const ProtocolTotal: React.VFC<ProtocolTotalProps> = (props) => {
  return (
    <div className={clsx(styles.total, props.className)}>
      <Paper radius={8} className={styles.totalItem}>
        <Typography variant="body2" className={styles.totalTitle}>
          Staked
        </Typography>
        <Typography variant="h4">
          ${bignumberUtils.format(props.myStaked)}
        </Typography>
        <Typography variant="body2" className={styles.valueChange}>
          <PercentChangeRender value={props.myStakedChange.day} />
        </Typography>
      </Paper>
      <Paper radius={8} className={styles.totalItem}>
        <Typography variant="body2" className={styles.totalTitle}>
          Unclaimed
        </Typography>
        <Typography variant="h4">
          ${bignumberUtils.format(props.myEarned)}
        </Typography>
        <Typography variant="body2" className={styles.valueChange}>
          <PercentChangeRender value={props.myEarnedChange.day} />
        </Typography>
      </Paper>
      {!props.readonly ? (
        <Paper radius={8} className={styles.totalItem}>
          <Typography variant="body2" className={styles.totalTitle}>
            Boosted APY
          </Typography>
          <Typography variant="h4">
            {props.hasAutostaking
              ? bignumberUtils.formatMax(
                  bignumberUtils.mul(props.myAPYBoost, 100),
                  10000
                )
              : 0}
            %
          </Typography>
          {!props.hasAutostaking && (
            <Typography
              variant="body3"
              as={Link}
              href={config.MEDIUM_LINK}
              target="_blank"
              className={styles.link}
            />
          )}
        </Paper>
      ) : (
        <Paper radius={8} className={styles.more}>
          <Typography variant="body2">
            In need of automation?{' '}
            <Link
              as={ReactRouterLink}
              to={`${paths.roadmap.list}?tag=protocolRequest`}
              underline="always"
            >
              Create a proposal
            </Link>{' '}
            and we will connect auto-staking for the protocol in no time.
          </Typography>
        </Paper>
      )}
    </div>
  )
}
