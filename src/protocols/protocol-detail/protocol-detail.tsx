import { Link, Typography } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import LaunchIcon from '@material-ui/icons/Launch'
import { makeStyles } from '@material-ui/core/styles'
import { useGate, useStore } from 'effector-react'

import { MainLayout } from '~/layouts'
import { StakingList } from '~/staking/staking-list'
import * as model from './protocol-detail.model'
import { ProtocolMetrics } from '~/protocols/protocol-metrics'

export type ProtocolDetailProps = {
  protocolId: string
}

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

const Protocol: React.VFC<ProtocolDetailProps> = (props) => {
  useGate(model.ProtocolDetailGate, props)

  const protocol = useStore(model.$protocol)
  const loading = useStore(model.fetchProtocolFx.pending)

  const classes = useStyles()

  return (
    <>
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
    </>
  )
}

export const ProtocolDetail: React.FC = () => {
  const params = useParams<{ protocolId: string }>()

  return (
    <MainLayout>
      <Protocol protocolId={params.protocolId} />
      <ProtocolMetrics />
      <Typography gutterBottom>Staking contracts</Typography>
      <StakingList protocolId={params.protocolId} />
    </MainLayout>
  )
}
