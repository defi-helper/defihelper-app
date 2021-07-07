import { Link, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LaunchIcon from '@material-ui/icons/Launch'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { useGate, useStore } from 'effector-react'

import { MainLayout } from '~/layouts'
import { StakingList } from '~/staking/staking-list'
import { Chart } from '~/common/chart'
import * as model from './protocol-detail.model'
import { MetricGroupEnum } from '~/graphql/_generated-types'

export type ProtocolDetailProps = unknown

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  icon: {
    verticalAlign: 'middle'
  }
}))

export const ProtocolDetail: React.VFC<ProtocolDetailProps> = () => {
  const params = useParams<{ protocolId: string }>()

  const [currentGroup, setCurrentGroup] = useState(MetricGroupEnum.Day)

  useGate(model.protocolDetailGate, params)
  useGate(model.protocolMetricGate, { ...params, group: currentGroup })

  const protocol = useStore(model.$protocol)
  const loading = useStore(model.fetchProtocolFx.pending)

  const metric = useStore(model.$metric)

  const classes = useStyles()

  const handleLoadChart = (group: MetricGroupEnum) => {
    setCurrentGroup(group)
  }

  useEffect(() => {
    model.fetchMetricFx({
      protocolId: params.protocolId,
      group: currentGroup
    })
  }, [currentGroup, params.protocolId])

  return (
    <MainLayout>
      {loading && !protocol && 'loading...'}
      {!loading && protocol && (
        <div>
          <div className={classes.header}>
            <Typography variant="h2">{protocol.name}</Typography>
            {protocol.link && (
              <Typography>
                <Link target="_blank" href={protocol.link}>
                  More info <LaunchIcon className={classes.icon} />
                </Link>
              </Typography>
            )}
          </div>
          <Typography gutterBottom>{protocol.description}</Typography>
          <Typography gutterBottom component="div">
            {protocol.icon && (
              <div>
                <img
                  src={protocol.icon}
                  alt={protocol.name}
                  width="30"
                  height="30"
                />
              </div>
            )}
          </Typography>
        </div>
      )}
      <Chart
        dataFields={{
          valueY: 'sum',
          dateX: 'date'
        }}
        data={metric[currentGroup]?.data}
        tooltipText="{sum}"
      />
      <div>
        {Object.values(metric).map((metricItem) => (
          <Button
            key={metricItem.value}
            disabled={metricItem.loading || currentGroup === metricItem.value}
            color="primary"
            variant="outlined"
            onClick={() => handleLoadChart(metricItem.value)}
          >
            {metricItem.loading ? 'loading...' : metricItem.value}
          </Button>
        ))}
      </div>
      <Typography gutterBottom>Staking contracts</Typography>
      <StakingList protocolId={params.protocolId} />
    </MainLayout>
  )
}
