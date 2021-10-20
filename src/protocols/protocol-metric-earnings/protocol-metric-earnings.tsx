import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from 'effector-react'
import clsx from 'clsx'

import { Chart } from '~/common/chart'
import { MetricGroupEnum } from '~/graphql/_generated-types'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { bignumberUtils } from '~/common/bignumber-utils'
import { ProtocolMetricGroups } from '../common'
import * as model from './protocol-metric-earnings.model'
import * as styles from './protocol-metric-earnings.css'

const EARNINGS_FIELDS = [
  {
    valueY: 'sum',
    name: 'Real Earnings',
    dateX: 'date',
    color: '#E9CC67',
  },
  {
    valueY: 'avg',
    name: 'Historicaly Estimated Earnings',
    dateX: 'date',
    color: '#4463EE',
  },
]

const ESTIMATED_FIELDS = [
  {
    valueY: 'sum',
    name: 'Estimated Value',
    dateX: 'date',
    color: '#F08BA9',
  },
  {
    valueY: 'avg',
    name: 'Value with Autostacking Automation',
    dateX: 'date',
    color: '#CCFF3C',
  },
]

export const ProtocolMetricEarnings: React.VFC<{ className?: string }> = (
  props
) => {
  const [currentGroup, setCurrentGroup] = useState<
    Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
  >(MetricGroupEnum.Day)

  const params = useParams<{ protocolId: string }>()

  const metric = useStore(model.$metric)

  useEffect(() => {
    model.fetchMetricFx({
      protocolId: params.protocolId,
      group: currentGroup,
    })
  }, [currentGroup, params.protocolId])

  const totalStakePrice = metric[currentGroup]?.data.reduce(
    (acc, metricValue) =>
      bignumberUtils.plus(acc, bignumberUtils.formatSpecific(metricValue.sum)),
    '0'
  )

  const handleChangeMetric = (
    group: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
  ) => {
    setCurrentGroup(group)
  }

  return (
    <div className={clsx(styles.root, props.className)}>
      <Typography variant="h3" className={styles.title}>
        Statistics
      </Typography>
      <div className={styles.charts}>
        <Paper radius={8} className={styles.chart}>
          <div className={styles.header}>
            <Typography>Earnings History</Typography>
            <ProtocolMetricGroups
              value={currentGroup}
              onChange={handleChangeMetric}
            >
              {Object.values(metric)}
            </ProtocolMetricGroups>
          </div>
          <Chart
            dataFields={EARNINGS_FIELDS}
            data={metric[currentGroup]?.data}
            tooltipText={['$', '{sum}'].join('')}
            id="earnings"
            names={EARNINGS_FIELDS.map(({ name }) => name)}
          />
        </Paper>
        <Paper radius={8} className={styles.chart}>
          <div className={styles.header}>
            <Typography>Estimated Earnings</Typography>
            <ProtocolMetricGroups
              value={currentGroup}
              onChange={handleChangeMetric}
            >
              {Object.values(metric)}
            </ProtocolMetricGroups>
          </div>
          <Chart
            dataFields={ESTIMATED_FIELDS}
            data={metric[currentGroup]?.data}
            tooltipText={['$', '{sum}'].join('')}
            id="estimated"
            names={ESTIMATED_FIELDS.map(({ name }) => name)}
          />
        </Paper>
      </div>
      <div className={styles.total}>
        <Paper radius={8} className={styles.totalItem}>
          <Typography variant="body2" className={styles.totalTitle}>
            Total Stake Price
          </Typography>
          <Typography variant="h4">
            ${bignumberUtils.format(totalStakePrice)}
          </Typography>
        </Paper>
        <Paper radius={8} className={styles.totalItem}>
          <Typography variant="body2" className={styles.totalTitle}>
            Total Claimed Reward
          </Typography>
          <Typography variant="h4">-</Typography>
        </Paper>
        <Paper radius={8} className={styles.totalItem}>
          <Typography variant="body2" className={styles.totalTitle}>
            Total Unclaimed Reward
          </Typography>
          <Typography variant="h4">-</Typography>
        </Paper>
      </div>
    </div>
  )
}
