import clsx from 'clsx'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { config } from '~/config'
import { ProtocolQuery } from '~/graphql/_generated-types'
import * as styles from './protocol-total.css'

export type ProtocolTotalProps = Exclude<
  ProtocolQuery['protocol'],
  null | undefined
>['metric'] & {
  hasAutostaking: boolean
  hideBoost?: boolean
  className?: string
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
      </Paper>
      <Paper radius={8} className={styles.totalItem}>
        <Typography variant="body2" className={styles.totalTitle}>
          Unclaimed
        </Typography>
        <Typography variant="h4">
          ${bignumberUtils.format(props.myEarned)}
        </Typography>
      </Paper>
      {!props.hideBoost && (
        <Paper radius={8} className={styles.totalItem}>
          <Typography variant="body2" className={styles.totalTitle}>
            Auto-Staking Boost
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
      )}
    </div>
  )
}
