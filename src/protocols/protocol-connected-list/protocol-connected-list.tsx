import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import { useStore } from 'effector-react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { paths } from '~/paths'

import * as model from './protocol-connected-list.model'

export type ProtocolConnectedListProps = unknown

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

export const ProtocolConnectedList: React.VFC<ProtocolConnectedListProps> =
  () => {
    const classes = useStyles()

    const protocols = useStore(model.$protocolList)

    return protocols.length ? (
      <List>
        <ListItem>
          <ListItemText primary="Connected protocols" />
        </ListItem>
        <List>
          {protocols.map((protocol) => (
            <ListItem
              button
              key={protocol.id}
              className={classes.nested}
              component={ReactRouterLink}
              to={paths.protocols.detail(protocol.id)}
            >
              {protocol.icon && (
                <ListItemIcon>
                  <img src={protocol.icon} alt="" width="40" height="40" />
                </ListItemIcon>
              )}
              <ListItemText primary={protocol.name} />
            </ListItem>
          ))}
        </List>
      </List>
    ) : null
  }
