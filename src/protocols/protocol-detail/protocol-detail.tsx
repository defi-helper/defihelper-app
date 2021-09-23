import { Link } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import LaunchIcon from '@material-ui/icons/Launch'
import { useGate, useStore } from 'effector-react'

import { AppLayout } from '~/layouts'
import { Typography } from '~/common/typography'
import { StakingList } from '~/staking/staking-list'
import { ProtocolMetrics } from '~/protocols/protocol-metrics'
import * as model from './protocol-detail.model'
import * as styles from './protocol-detail.css'

export type ProtocolDetailProps = {
  protocolId: string
}

const Protocol: React.VFC<ProtocolDetailProps> = (props) => {
  useGate(model.ProtocolDetailGate, props)

  const protocol = useStore(model.$protocol)
  const loading = useStore(model.fetchProtocolFx.pending)

  return (
    <>
      {loading && !protocol && 'loading...'}
      {!loading && protocol && (
        <div>
          <div className={styles.header}>
            <Typography variant="h2">{protocol.name}</Typography>
            {protocol.link && (
              <Typography>
                <Link target="_blank" href={protocol.link}>
                  More info <LaunchIcon className={styles.icon} />
                </Link>
              </Typography>
            )}
          </div>
          <Typography>{protocol.description}</Typography>
          <Typography as="div">
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
    <AppLayout>
      <Protocol protocolId={params.protocolId} />
      <ProtocolMetrics />
      <Typography>Staking contracts</Typography>
      <StakingList protocolId={params.protocolId} />
    </AppLayout>
  )
}
