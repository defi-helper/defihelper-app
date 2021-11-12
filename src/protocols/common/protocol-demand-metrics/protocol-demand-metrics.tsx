import clsx from 'clsx'
import isEmpty from 'lodash.isempty'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { ProtocolQuery } from '~/graphql/_generated-types'
import { ProtocolLastMonthChart } from '../protocol-last-month-chart/protocol-last-month-chart'
import * as styles from './protocol-demand-metrics.css'

export type ProtocolDemandMetricsProps = {
  className?: string
  telegram: Exclude<ProtocolQuery['protocol'], undefined | null>['telegram']
  coingecko: Exclude<ProtocolQuery['protocol'], undefined | null>['coingecko']
  coinmarketcap: Exclude<
    ProtocolQuery['protocol'],
    undefined | null
  >['coinmarketcap']
}

const STAKED_FIELDS = [
  {
    valueY: 'sum',
    name: 'Alt coins',
    dateX: 'date',
    color: '#39C077',
  },
]

export const ProtocolDemandMetrics: React.FC<ProtocolDemandMetricsProps> = (
  props
) => {
  const [telegramUserCount = undefined] = props.telegram.slice(-1)
  const [coinmarketcapCount = undefined] = props.coinmarketcap.slice(-1)
  const [coingeckoCount = undefined] = props.coingecko.slice(-1)

  const metric = [
    ...props.telegram,
    ...props.coinmarketcap,
    ...props.coinmarketcap,
  ]

  return (
    <div className={clsx(styles.root, props.className)}>
      <Typography variant="h3" className={styles.title}>
        Statistics
      </Typography>
      <Paper radius={8} className={styles.tableInner}>
        <div className={clsx(styles.row, styles.grey)}>
          <Typography variant="body2">Pool</Typography>
          <Typography variant="body2">Users</Typography>
          <Typography variant="body2">Last Month</Typography>
        </div>
        {isEmpty(metric) && (
          <Typography align="center" variant="body2" className={styles.empty}>
            Empty
          </Typography>
        )}
        {!isEmpty(props.telegram) && (
          <div className={clsx(styles.row)}>
            <Typography variant="body2">Telegram</Typography>
            <Typography variant="body2" family="mono">
              {bignumberUtils.format(telegramUserCount?.sum)}
            </Typography>
            <div>
              <ProtocolLastMonthChart
                dataFields={STAKED_FIELDS}
                data={props.telegram}
                id="telegram"
              />
            </div>
          </div>
        )}
        {!isEmpty(props.coingecko) && (
          <div className={clsx(styles.row)}>
            <Typography variant="body2">Coingecko</Typography>
            <Typography variant="body2" family="mono">
              {bignumberUtils.format(coingeckoCount?.sum)}
            </Typography>
            <div>
              <ProtocolLastMonthChart
                dataFields={STAKED_FIELDS}
                data={props.coingecko}
                id="coingecko"
              />
            </div>
          </div>
        )}
        {!isEmpty(props.coinmarketcap) && (
          <div className={clsx(styles.row)}>
            <Typography variant="body2">Coinmarketcap</Typography>
            <Typography variant="body2" family="mono">
              {bignumberUtils.format(coinmarketcapCount?.sum)}
            </Typography>
            <div>
              <ProtocolLastMonthChart
                id="coinmarketcap"
                dataFields={STAKED_FIELDS}
                data={props.coinmarketcap}
              />
            </div>
          </div>
        )}
      </Paper>
    </div>
  )
}
