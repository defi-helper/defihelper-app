import { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import clsx from 'clsx'

import { Chart } from '~/common/chart'
import { MetricGroupEnum } from '~/graphql/_generated-types'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { bignumberUtils } from '~/common/bignumber-utils'
import { ProtocolChartWrap, ProtocolMetricGroups } from '../common'
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
    valueY: 'hold',
    name: 'Estimated Value',
    dateX: 'date',
    color: '#F08BA9',
  },
  {
    valueY: 'autostaking',
    name: 'Value with Autostacking Automation',
    dateX: 'date',
    color: '#CCFF3C',
  },
]

const SUM = 10000
const APY = 90 / 100

export const ProtocolMetricEarnings: React.VFC<{ className?: string }> = (
  props
) => {
  const [currentGroup, setCurrentGroup] = useState<
    Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
  >(MetricGroupEnum.Day)

  const metric = useStore(model.$metric)

  useEffect(() => {
    model.fetchMetricFx({
      group: currentGroup,
      balance: SUM,
      apy: APY,
    })
  }, [currentGroup])

  const totalStakePrice = '0'

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
        <ProtocolChartWrap
          header={
            <>
              <Typography>Earnings History</Typography>
              <ProtocolMetricGroups
                value={currentGroup}
                onChange={handleChangeMetric}
              >
                {Object.values(metric)}
              </ProtocolMetricGroups>
            </>
          }
        >
          <Chart
            dataFields={EARNINGS_FIELDS}
            data={metric[currentGroup]?.data}
            tooltipText={['$', '{sum}'].join('')}
            id="earnings"
            names={EARNINGS_FIELDS.map(({ name }) => name)}
          />
        </ProtocolChartWrap>
        <ProtocolChartWrap
          header={
            <>
              <Typography>Estimated Earnings</Typography>
              <ProtocolMetricGroups
                value={currentGroup}
                onChange={handleChangeMetric}
              >
                {Object.values(metric)}
              </ProtocolMetricGroups>
            </>
          }
        >
          <Chart
            dataFields={ESTIMATED_FIELDS}
            data={metric[currentGroup]?.data}
            // eslint-disable-next-line no-template-curly-in-string
            tooltipText="{name}: ${valueY}"
            id="estimated"
            names={ESTIMATED_FIELDS.map(({ name }) => name)}
          />
        </ProtocolChartWrap>
      </div>
      <div className={styles.total}>
        <Paper radius={8} className={styles.totalItem}>
          <Typography variant="body2" className={styles.totalTitle}>
            Total Staked
          </Typography>
          <Typography variant="h4">
            ${bignumberUtils.format(totalStakePrice)}
          </Typography>
        </Paper>
        <Paper radius={8} className={styles.totalItem}>
          <Typography variant="body2" className={styles.totalTitle}>
            Total Unclaimed
          </Typography>
          <Typography variant="h4">-</Typography>
        </Paper>
        <Paper radius={8} className={styles.totalItem}>
          <Typography variant="body2" className={styles.totalTitle}>
            APY Boost
          </Typography>
          <Typography variant="h4">-</Typography>
        </Paper>
      </div>
    </div>
  )
}
