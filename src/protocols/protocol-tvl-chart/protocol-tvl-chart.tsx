import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'

import { Chart } from '~/common/chart'
import { Typography } from '~/common/typography'
import { bignumberUtils } from '~/common/bignumber-utils'
import { ProtocolChartWrap } from '../common'
import { dateUtils } from '~/common/date-utils'
import * as model from './protocol-tvl-chart.model'

const TVL_FIELDS = [
  {
    valueY: 'sum',
    name: 'Total value locked',
    dateX: 'date',
    color: '#E9CC67',
  },
]

export const ProtocolTvlChart: React.VFC = () => {
  const params = useParams<{ protocolId: string }>()

  const metric = useStore(model.$metric)
  const loading = useStore(model.fetchMetricFx.pending)

  useEffect(() => {
    model.fetchMetricFx({
      protocolId: params.protocolId,
    })
  }, [params.protocolId])

  const [tvlSum = undefined] = metric.slice(-1)

  const tvlData = metric.map((metricItem) => {
    return {
      ...metricItem,
      date: dateUtils.toDate(metricItem.date),
      sum: bignumberUtils.floor(metricItem.sum),
      format: bignumberUtils.format(metricItem.sum, 0),
    }
  })

  return (
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
        loading={loading && isEmpty(tvlData)}
      />
    </ProtocolChartWrap>
  )
}
