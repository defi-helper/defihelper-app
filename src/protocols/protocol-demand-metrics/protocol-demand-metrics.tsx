import { useGate, useStore } from 'effector-react'
import clsx from 'clsx'
import isEmpty from 'lodash.isempty'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { Link } from '~/common/link'
import { ProtocolOverviewQuery } from '~/api/_generated-types'
import { ProtocolLastMonthChart } from '~/protocols/common'
import { Loader } from '~/common/loader'
import * as styles from './protocol-demand-metrics.css'
import * as model from './protocol-demand-metrics.model'

export type ProtocolDemandMetricsProps = {
  className?: string
  links?: Exclude<ProtocolOverviewQuery['protocol'], undefined | null>['links']
  protocolId: string
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
  const demandMetrics = useStore(model.$demandMetrics)
  const loading = useStore(model.fetchDemandMetricsFx.pending)

  useGate(model.ProtocolDemandMetricsGate, props.protocolId)

  if (loading)
    return (
      <div className={clsx(styles.root, props.className)}>
        <Typography variant="h3" className={styles.title}>
          Social Media Engagement
        </Typography>
        <div className={styles.loader}>
          <Loader height="36" />
        </div>
      </div>
    )

  if (!demandMetrics) return <></>

  const metric = [
    ...demandMetrics.telegram,
    ...demandMetrics.coinmarketcap,
    ...demandMetrics.coinmarketcap,
  ]

  const servicesSupply = [
    demandMetrics.telegram,
    demandMetrics.coingecko,
    demandMetrics.coinmarketcap,
  ]
    .map((target) =>
      target
        .map((v) => v.entityIdentifier)
        .filter((x, i, a) => a.indexOf(x) === i)
        .map((v) => {
          return {
            identifier: v,
            link: [
              ...(props.links?.social ?? []),
              ...(props.links?.listing ?? []),
            ].find((link) => link.id === v),
            points: target.filter((tg) => tg.entityIdentifier === v),
          }
        })
    )
    .flat()

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
        {servicesSupply.map((row, i) => (
          <Row
            key={i.toString()}
            title={row.link?.name}
            sum={row.points.slice(-1)?.[0]?.sum}
            link={row.link?.value}
            data={row.points}
          />
        ))}
      </Paper>
    </div>
  )
}
