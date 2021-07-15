import { Link, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LaunchIcon from '@material-ui/icons/Launch'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { useGate, useStore } from 'effector-react'
import CircularProgress from '@material-ui/core/CircularProgress'

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
  },

  actions: {
    display: 'flex',
    gap: 8
  },

  wrapper: {
    position: 'relative',
    display: 'inline-flex'
  },

  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}))

export const ProtocolDetail: React.VFC<ProtocolDetailProps> = () => {
  const params = useParams<{ protocolId: string }>()

  const [currentGroup, setCurrentGroup] = useState(MetricGroupEnum.Day)

  useGate(model.ProtocolDetailGate, params)
  useGate(model.ProtocolMetricGate, { ...params, group: currentGroup })

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
      <Typography gutterBottom>Staking contracts</Typography>
      {!loading && protocol && (
        <StakingList
          protocolId={params.protocolId}
          protocolAdapter={protocol.adapter}
        />
      )}
    </MainLayout>
  )
}
