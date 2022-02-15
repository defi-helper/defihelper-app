import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from 'effector-react'
import clsx from 'clsx'

import { Chart } from '~/common/chart'
import { MetricGroupEnum } from '~/graphql/_generated-types'
import { Typography } from '~/common/typography'
import { bignumberUtils } from '~/common/bignumber-utils'
import { ProtocolChartWrap } from '../common'
import { useTheme } from '~/common/theme'
import * as model from './protocol-metric-overview.model'
import * as styles from './protocol-metric-overview.css'
import { dateUtils } from '~/common/date-utils'

const TVL_FIELDS = [
  {
    valueY: 'sum',
    name: 'Total value locked',
    dateX: 'date',
    color: '#E9CC67',
  },
]

const currentGroup = MetricGroupEnum.Day

export const ProtocolMetricOverview: React.VFC<{
  className?: string
  isDebank: boolean
}> = (props) => {
  const params = useParams<{ protocolId: string }>()

  const metric = useStore(model.$metric)

  useEffect(() => {
    model.fetchMetricFx({
      protocolId: params.protocolId,
      group: currentGroup,
    })
  }, [params.protocolId])

  const [tvlSum = undefined] =
    metric[currentGroup]?.data[props.isDebank ? 'tvlDebank' : 'tvl']?.slice(-1)

  const tvlData = metric[currentGroup]?.data[
    props.isDebank ? 'tvlDebank' : 'tvl'
  ]?.map((metricItem) => {
    return {
      ...metricItem,
      date: dateUtils.toDate(metricItem.date),
      sum: bignumberUtils.floor(metricItem.sum),
      format: bignumberUtils.format(metricItem.sum, 0),
    }
  })

  const walletData = metric[currentGroup]?.data?.uniqueWalletsCount.map(
    (wallet) => ({
      ...wallet,
      date: dateUtils.toDate(wallet.date),
      sum: bignumberUtils.floor(wallet.sum),
      format: bignumberUtils.format(wallet.sum, 0),
    })
  )

  const [uniqueWalletsSum = undefined] =
    metric[currentGroup]?.data.uniqueWalletsCount?.slice(-1)

  const [themeMode] = useTheme()

  const walletFields = useMemo(() => {
    return [
      {
        valueY: 'sum',
        name: 'Unique Wallets',
        dateX: 'date',
        color: themeMode === 'dark' ? '#CCFF3C' : '#39C077',
      },
    ]
  }, [themeMode])

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.title}>
        <Typography variant="h3">Statistics</Typography>
      </div>
      <div className={styles.charts}>
        <ProtocolChartWrap
          header={
            <>
              <Typography>Total Value Locked</Typography>
              <Typography family="mono">
                ${bignumberUtils.format(tvlSum?.sum)}
              </Typography>
            </>
          }
        >
          <Chart
            dataFields={TVL_FIELDS}
            data={tvlData}
            tooltipText={['$', '{format}'].join('')}
            id="tvl"
            names={TVL_FIELDS.map(({ name }) => name)}
          />
        </ProtocolChartWrap>
        <ProtocolChartWrap
          header={
            <>
              <Typography>Unique Wallets</Typography>
              <Typography family="mono">
                {bignumberUtils.format(uniqueWalletsSum?.sum, 0)}
              </Typography>
            </>
          }
        >
          <Chart
            dataFields={walletFields}
            data={walletData}
            tooltipText="{format}"
            id="unique_wallets"
            names={walletFields.map(({ name }) => name)}
          />
        </ProtocolChartWrap>
      </div>
    </div>
  )
}
