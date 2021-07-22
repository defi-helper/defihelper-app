import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { useStore } from 'effector-react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import { Chart } from '~/common/chart'
import { MetricGroupEnum } from '~/graphql/_generated-types'
import * as model from './protocol-metrics.model'

const useStyles = makeStyles(() => ({
  actions: {
    display: 'flex',
    gap: 8,
  },

  wrapper: {
    position: 'relative',
    display: 'inline-flex',
  },

  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

export const ProtocolMetrics: React.FC<unknown> = () => {
  const classes = useStyles()

  const [currentGroup, setCurrentGroup] = useState(MetricGroupEnum.Day)

  const params = useParams<{ protocolId: string }>()

  const metric = useStore(model.$metric)

  const handleLoadChart = (group: MetricGroupEnum) => {
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
        dataFields={{
          valueY: 'sum',
          dateX: 'date',
        }}
        data={metric[currentGroup]?.data}
        tooltipText="{sum}"
      />
      <div className={classes.actions}>
        {Object.values(metric).map((metricItem) => (
          <div key={metricItem.value} className={classes.wrapper}>
            <Button
              disabled={metricItem.loading || currentGroup === metricItem.value}
              color="primary"
              variant="outlined"
              onClick={() => handleLoadChart(metricItem.value)}
            >
              {metricItem.value}
            </Button>
            {metricItem.loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        ))}
      </div>
    </>
  )
}
