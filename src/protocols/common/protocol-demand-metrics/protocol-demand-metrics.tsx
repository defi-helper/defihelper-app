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
  title?: string
}

const Row: React.VFC<RowProps> = (props) => {
  return (
    <div className={clsx(styles.row)}>
      <Typography variant="body2" as={Link} href={props.link} target="_blank">
        {props.title || 'title not set yet'}
      </Typography>
      <Typography variant="body2" family="mono" align="right">
        {bignumberUtils.format(props.sum)}
      </Typography>
      <div className={styles.chart}>
        <ProtocolLastMonthChart
          dataFields={STAKED_FIELDS}
          data={props.data}
          id={(props.title || '').toLowerCase()}
        />
      </div>
    </div>
  )
}

export const ProtocolDemandMetrics: React.FC<ProtocolDemandMetricsProps> = (
  props
) => {
  const metric = [
    ...props.telegram,
    ...props.coinmarketcap,
    ...props.coinmarketcap,
  ]

  const servicesSupply = [
    props.telegram,
    props.coingecko,
    props.coinmarketcap,
  ].map((target) =>
    target
      .map((v) => v.entityIdentifier)
      .filter((x, i, a) => a.indexOf(x) === i)
      .map((v) => {
        return {
          identifier: v,
          link: [...props.links.social, ...props.links.listing].find(
            (link) => link.id === v
          ),
          points: target.filter((tg) => tg.entityIdentifier === v),
        }
      })
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
        {servicesSupply.map((stack) =>
          stack.map((row) => (
            <Row
              title={row.link?.name}
              sum={row.points[0].sum}
              link={row.link?.value}
              data={row.points}
            />
          ))
        )}
      </Paper>
    </div>
  )
}
