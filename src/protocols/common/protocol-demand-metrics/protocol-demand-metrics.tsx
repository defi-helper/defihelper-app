import clsx from 'clsx'
import isEmpty from 'lodash.isempty'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { Link } from '~/common/link'
import { ProtocolQuery } from '~/graphql/_generated-types'
import { ProtocolLastMonthChart } from '../protocol-last-month-chart'
import * as styles from './protocol-demand-metrics.css'

export type ProtocolDemandMetricsProps = {
  className?: string
  telegram: Exclude<ProtocolQuery['protocol'], undefined | null>['telegram']
  coingecko: Exclude<ProtocolQuery['protocol'], undefined | null>['coingecko']
  coinmarketcap: Exclude<
    ProtocolQuery['protocol'],
    undefined | null
  >['coinmarketcap']
  links: Exclude<ProtocolQuery['protocol'], undefined | null>['links']
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

  const telegramLink = props.links.social.find(
    ({ name }) => name.toLowerCase() === 'telegram'
  )
  const coingeckoLink = props.links.listing.find(
    ({ name }) => name.toLowerCase() === 'coingecko'
  )
  const coinmarketcapLink = props.links.listing.find(
    ({ name }) => name.toLowerCase() === 'coinmarketcap'
  )

  if (isEmpty(metric)) return <></>

  return (
    <div className={clsx(styles.root, props.className)}>
      <Typography variant="h3" className={styles.title}>
        Social Media Engagement
      </Typography>
      <Paper radius={8} className={styles.tableInner}>
        <div className={clsx(styles.row, styles.grey)}>
          <Typography variant="body2">Pool</Typography>
          <Typography variant="body2">Users</Typography>
          <Typography variant="body2">Last Month</Typography>
        </div>
        {!isEmpty(props.telegram) && (
          <div className={clsx(styles.row)}>
            <Typography
              variant="body2"
              as={Link}
              href={telegramLink?.value}
              target="_blank"
            >
              Telegram
            </Typography>
            <Typography variant="body2" family="mono">
              {bignumberUtils.format(telegramUserCount?.sum)}
            </Typography>
            <div className={styles.chart}>
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
            <Typography
              variant="body2"
              as={Link}
              href={coingeckoLink?.value}
              target="_blank"
            >
              Coingecko
            </Typography>
            <Typography variant="body2" family="mono">
              {bignumberUtils.format(coingeckoCount?.sum)}
            </Typography>
            <div className={styles.chart}>
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
            <Typography
              variant="body2"
              as={Link}
              href={coinmarketcapLink?.value}
              target="_blank"
            >
              Coinmarketcap
            </Typography>
            <Typography variant="body2" family="mono">
              {bignumberUtils.format(coinmarketcapCount?.sum)}
            </Typography>
            <div className={styles.chart}>
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
