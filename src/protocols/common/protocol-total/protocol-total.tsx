import { bignumberUtils } from '~/common/bignumber-utils'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { ProtocolQuery } from '~/graphql/_generated-types'
import * as styles from './protocol-total.css'

export type ProtocolTotalProps = Exclude<
  ProtocolQuery['protocol'],
  null | undefined
>['metric']

export const ProtocolTotal: React.VFC<ProtocolTotalProps> = (props) => {
  return (
    <div className={styles.total}>
      <Paper radius={8} className={styles.totalItem}>
        <Typography variant="body2" className={styles.totalTitle}>
          Total Staked
        </Typography>
        <Typography variant="h4">
          ${bignumberUtils.format(props.tvl)}
        </Typography>
      </Paper>
      <Paper radius={8} className={styles.totalItem}>
        <Typography variant="body2" className={styles.totalTitle}>
          Total Unclaimed
        </Typography>
        <Typography variant="h4">
          ${bignumberUtils.format(props.myEarned)}
        </Typography>
      </Paper>
      <Paper radius={8} className={styles.totalItem}>
        <Typography variant="body2" className={styles.totalTitle}>
          APY Boost
        </Typography>
        <Typography variant="h4">
          {bignumberUtils.format(props.myAPY)}%
        </Typography>
      </Paper>
    </div>
  )
}
