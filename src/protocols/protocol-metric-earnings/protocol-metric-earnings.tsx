import { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import clsx from 'clsx'

import { Chart } from '~/common/chart'
import { MetricGroupEnum, ProtocolQuery } from '~/graphql/_generated-types'
import { Typography } from '~/common/typography'
import { ProtocolChartWrap, ProtocolMetricGroups } from '../common'
import * as stakingListModel from '~/staking/staking-list/staking-list.model'
import * as model from './protocol-metric-earnings.model'
import * as styles from './protocol-metric-earnings.css'

const STAKED_FIELDS = [
  {
    valueY: 'altCoin',
    name: 'Alt coins',
    dateX: 'date',
    color: '#E9CC67',
  },
  {
    valueY: 'stableCoin',
    name: 'Stable coins',
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

const currentEarningsGroup = MetricGroupEnum.Day

export type ProtocolMetricEarningsProps = {
  className?: string
  metric: Exclude<ProtocolQuery['protocol'], null | undefined>['metric']
}

export const ProtocolMetricEarnings: React.FC<ProtocolMetricEarningsProps> = (
  props
) => {
  const [currentStakedGroup, setCurrentStakedGroup] = useState<
    Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
  >(MetricGroupEnum.Day)

  const earningsMetric = useStore(model.$earningsMetric)
  const contracts = useStore(stakingListModel.$contractList)
  const stakedMetric = useStore(model.$stakedMetric)

  useEffect(() => {
    model.fetchEarningMetricFx({
      group: currentEarningsGroup,
      balance: Number(props.metric.myStaked ?? 0),
      apy: Number(props.metric.myAPY ?? 0),
    })
  }, [props.metric.myStaked, props.metric.myAPY])

  useEffect(() => {
    if (!contracts.length) return

    model.fetchStakedMetricFx({
      group: currentStakedGroup,
      contracts: contracts.map(({ id }) => id),
    })
  }, [currentStakedGroup, contracts])

  const handleChangeStakedMetric = (
    group: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
  ) => {
    setCurrentStakedGroup(group)
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
              <Typography>Staked Balance</Typography>
              <ProtocolMetricGroups
                value={currentStakedGroup}
                onChange={handleChangeStakedMetric}
              >
                {Object.values(stakedMetric)}
              </ProtocolMetricGroups>
            </>
          }
        >
          <Chart
            dataFields={STAKED_FIELDS}
            data={stakedMetric[currentStakedGroup]?.data}
            // eslint-disable-next-line no-template-curly-in-string
            tooltipText="{name}: ${valueY}"
            id="staked"
            names={STAKED_FIELDS.map(({ name }) => name)}
          />
        </ProtocolChartWrap>
        <ProtocolChartWrap
          header={
            <>
              <Typography>Estimated Earnings (in 3 month)</Typography>
            </>
          }
        >
          <Chart
            dataFields={ESTIMATED_FIELDS}
            data={earningsMetric[currentEarningsGroup]?.data}
            // eslint-disable-next-line no-template-curly-in-string
            tooltipText="{name}: ${valueY}"
            id="estimated"
            names={ESTIMATED_FIELDS.map(({ name }) => name)}
          />
        </ProtocolChartWrap>
      </div>
      {props.children}
    </div>
  )
}
