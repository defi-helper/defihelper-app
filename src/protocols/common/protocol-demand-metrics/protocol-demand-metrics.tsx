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

type RowProps = {
  sum?: string
  link?: string
  data?: unknown[]
  title: string
}

const Row: React.VFC<RowProps> = (props) => {
  return (
    <div className={clsx(styles.row)}>
      <Typography variant="body2" as={Link} href={props.link} target="_blank">
        {props.title}
      </Typography>
      <Typography variant="body2" family="mono" align="right">
        {bignumberUtils.format(props.sum)}
      </Typography>
      <div className={styles.chart}>
        <ProtocolLastMonthChart
          dataFields={STAKED_FIELDS}
          data={props.data}
          id={props.title.toLowerCase()}
        />
      </div>
    </div>
  )
}

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
          <Typography variant="body2" align="right">
            Users
          </Typography>
          <Typography variant="body2">Last Month</Typography>
        </div>
        {!isEmpty(props.telegram) && (
          <Row
            title="Telegram"
            sum={telegramUserCount?.sum}
            link={telegramLink?.value}
            data={props.telegram}
          />
        )}
        {!isEmpty(props.coingecko) && (
          <Row
            title="Coingecko"
            sum={coingeckoCount?.sum}
            link={coingeckoLink?.value}
            data={props.coingecko}
          />
        )}
        {!isEmpty(props.coinmarketcap) && (
          <Row
            title="Coinmarketcap"
            sum={coinmarketcapCount?.sum}
            link={coinmarketcapLink?.value}
            data={props.coinmarketcap}
          />
        )}
      </Paper>
    </div>
  )
}
