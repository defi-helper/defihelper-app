import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from 'effector-react'
import { makeStyles } from '@material-ui/core/styles'

import { Chart } from '~/common/chart'
import { Button } from '~/common/button'
import { MetricGroupEnum } from '~/graphql/_generated-types'
import * as model from './protocol-metrics.model'

const useStyles = makeStyles(() => ({
  actions: {
    display: 'flex',
    gap: 8,
  },

  wrapper: {
    display: 'inline-flex',
  },
}))

export const ProtocolMetrics: React.FC<unknown> = () => {
  const classes = useStyles()

  const [currentGroup, setCurrentGroup] = useState(MetricGroupEnum.Day)

  const params = useParams<{ protocolId: string }>()

  const metric = useStore(model.$metric)

  const handleLoadChart = (group: MetricGroupEnum) => () => {
    setCurrentGroup(group)
  }

  useEffect(() => {
    model.fetchMetricFx({
      protocolId: params.protocolId,
      group: currentGroup,
    })
  }, [currentGroup, params.protocolId])

  return (
    <>
      <Chart
        dataFields={[
          {
            valueY: 'sum',
            dateX: 'date',
          },
        ]}
        data={metric[currentGroup]?.data}
        tooltipText={['$', '{sum}'].join('')}
      />
      <div className={classes.actions}>
        {Object.values(metric).map((metricItem) => (
          <div key={metricItem.value} className={classes.wrapper}>
            <Button
              disabled={currentGroup === metricItem.value}
              loading={metricItem.loading}
              color="primary"
              variant="outlined"
              onClick={handleLoadChart(metricItem.value)}
            >
              {metricItem.value}
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}
