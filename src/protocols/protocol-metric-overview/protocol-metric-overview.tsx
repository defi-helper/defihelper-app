import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from 'effector-react'
import clsx from 'clsx'

import { Chart } from '~/common/chart'
import { MetricGroupEnum } from '~/graphql/_generated-types'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as model from './protocol-metric-overview.model'
import * as styles from './protocol-metric-overview.css'

const TVL_FIELDS = [
  {
    valueY: 'sum',
    name: 'Total value locked',
    dateX: 'date',
    color: '#E9CC67',
  },
]

const WALLET_FIELDS = [
  {
    valueY: 'avg',
    name: 'Unique Wallets',
    dateX: 'date',
    color: '#CCFF3C',
  },
]

export const ProtocolMetricOverview: React.VFC<{ className?: string }> = (
  props
) => {
  const [currentGroup] = useState<
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

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.title}>
        <Typography variant="h3">Statistics</Typography>
        <ButtonBase className={styles.select}>
          Daily <Icon icon="arrowDown" className={styles.selectArrow} />
        </ButtonBase>
      </div>
      <div className={styles.charts}>
        <Paper radius={8} className={styles.chart}>
          <div className={styles.header}>
            <Typography>Total Value Locked</Typography>
          </div>
          <Chart
            dataFields={TVL_FIELDS}
            data={metric[currentGroup]?.data}
            tooltipText={['$', '{sum}'].join('')}
            id="tvl"
            names={TVL_FIELDS.map(({ name }) => name)}
          />
        </Paper>
        <Paper radius={8} className={styles.chart}>
          <div className={styles.header}>
            <Typography>Unique Wallets</Typography>
          </div>
          <Chart
            dataFields={WALLET_FIELDS}
            data={metric[currentGroup]?.data}
            tooltipText={['$', '{sum}'].join('')}
            id="unique_wallets"
            names={WALLET_FIELDS.map(({ name }) => name)}
          />
        </Paper>
      </div>
    </div>
  )
}
