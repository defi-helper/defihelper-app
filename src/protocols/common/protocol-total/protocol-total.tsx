import { bignumberUtils } from '~/common/bignumber-utils'
import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { ProtocolQuery } from '~/graphql/_generated-types'
import * as styles from './protocol-total.css'

export type ProtocolTotalProps = Exclude<
  ProtocolQuery['protocol'],
  null | undefined
>['metric'] & {
  hasAutostaking: boolean
}

const MEDIUM_LINK = `https://defihelper.medium.com/introducing-defihelper-the-most-advanced-non-custodial-defi-investment-tool-on-the-market-aa7e591a8f7f`

export const ProtocolTotal: React.VFC<ProtocolTotalProps> = (props) => {
  const apyBoost = bignumberUtils.mul(props.myAPY, 100)

  return (
    <div className={styles.total}>
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
      <Paper radius={8} className={styles.totalItem}>
        <Typography variant="body2" className={styles.totalTitle}>
          Autostaking Boost
        </Typography>
        <Typography variant="h4">
          {props.hasAutostaking ? bignumberUtils.formatMax(apyBoost, 10000) : 0}
          %
        </Typography>
        {!props.hasAutostaking && (
          <Typography
            variant="body3"
            as={Link}
            href={MEDIUM_LINK}
            target="_blank"
            className={styles.link}
          >
            you can earn up to 1900%
          </Typography>
        )}
      </Paper>
    </div>
  )
}
