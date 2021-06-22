import { Link, Typography } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import LaunchIcon from '@material-ui/icons/Launch'
import { makeStyles } from '@material-ui/core/styles'

import { MainLayout } from '~/layouts'
import { StakingList } from '~/staking/staking-list'
import { NETWORKS, PROTOCOLS_MAP } from '../common'

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

  const protocol = PROTOCOLS_MAP[params.protocolId]

  const classes = useStyles()

  return (
    <MainLayout>
      <div>
        <div className={classes.header}>
          <Typography variant="h2">{protocol.title}</Typography>
          <Typography>
            <Link target="_blank" href={protocol.link}>
              More info <LaunchIcon className={classes.icon} />
            </Link>
          </Typography>
        </div>
        <Typography gutterBottom>{protocol.description}</Typography>
        <Typography gutterBottom component="div">
          <div>Network: {NETWORKS[protocol.network]}</div>
          <div>Token: {protocol.reward.tokens.join(', ')}</div>
        </Typography>
      </div>
      <Typography gutterBottom>Staking pools</Typography>
      <StakingList protocolId={params.protocolId} />
    </MainLayout>
  )
}
