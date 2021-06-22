import { makeStyles, Paper } from '@material-ui/core'
import { useMemo } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { MainLayout } from '~/layouts'
import { paths } from '~/paths'
import { useQueryParams } from '~/common/hooks'
import { PROTOCOLS, NETWORKS } from '../common'

export type ProtocolListProps = unknown

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none'
  },

  link: {
    textDecoration: 'none'
  },

  card: {
    padding: '10px 15px',
    marginBottom: 5,
    display: 'flex',
    alignItems: 'center'
  },

  tokens: {
    marginLeft: 'auto'
  },

  mr: {
    marginRight: 20
  },

  network: {
    opacity: 0.6
  }
}))

export const ProtocolList: React.VFC<ProtocolListProps> = () => {
  const classes = useStyles()

  const queryParams = useQueryParams()

  const network = queryParams.get('network')

  const protocols = useMemo(
    () =>
      network
        ? PROTOCOLS.filter((protocol) => protocol.network === network)
        : PROTOCOLS,
    [network]
  )

  return (
    <MainLayout>
      <ul className={classes.root}>
        {protocols.map((protocol) => (
          <li key={protocol.id}>
            <ReactRouterLink
              to={paths.protocols.detail(protocol.id)}
              className={classes.link}
            >
              <Paper className={classes.card}>
                <div className={classes.mr}>{protocol.title}</div>
                <div className={classes.network}>
                  {NETWORKS[protocol.network]}
                </div>
                <div className={`${classes.mr} ${classes.tokens}`}>
                  {protocol.reward.tokens.join(', ')}
                </div>
              </Paper>
            </ReactRouterLink>
          </li>
        ))}
      </ul>
    </MainLayout>
  )
}
