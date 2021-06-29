import { Link, Typography } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import LaunchIcon from '@material-ui/icons/Launch'
import { makeStyles } from '@material-ui/core/styles'
import { useGate, useStore } from 'effector-react'

import { MainLayout } from '~/layouts'
import { StakingList } from '~/staking/staking-list'
import * as model from './protocol-detail.model'

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

  useGate(model.Gate, params)

  const protocol = useStore(model.$protocol)
  const loading = useStore(model.fetchProtocolFx.pending)

  const classes = useStyles()

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
            <div>Adapter: {protocol.adapter}</div>
            <div>Icon: {protocol.icon}</div>
          </Typography>
        </div>
      )}
      <Typography gutterBottom>Staking contracts</Typography>
      <StakingList protocolId={params.protocolId} />
    </MainLayout>
  )
}
