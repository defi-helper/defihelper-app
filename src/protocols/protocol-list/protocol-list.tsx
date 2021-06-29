import { makeStyles, Paper } from '@material-ui/core'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useGate, useStore } from 'effector-react'
import Button from '@material-ui/core/Button'
import { useMemo } from 'react'

import { MainLayout } from '~/layouts'
import { paths } from '~/paths'
import { Can, useAbility } from '~/users'
import { useDialog } from '~/common/dialog'
import { ConfirmDialog } from '~/common/confirm-dialog'
import * as model from './protocol-list.model'

export type ProtocolListProps = unknown

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none'
  },

  link: {
    textDecoration: 'none',
    width: '100%'
  },

  item: {
    display: 'flex',
    marginBottom: 5,
    width: '100%'
  },

  edit: {},

  card: {
    padding: '10px 15px',
    display: 'flex',
    alignItems: 'center'
  },

  tokens: {
    marginLeft: 'auto'
  },

  mr: {
    marginRight: 20
  }
}))

export const ProtocolList: React.VFC<ProtocolListProps> = () => {
  const classes = useStyles()

  const ability = useAbility()

  const [openConfirm] = useDialog(ConfirmDialog)

  const loading = useStore(model.fetchProtocolListFx.pending)
  const protocolList = useStore(model.$protocolList)

  const deleteLoading = useStore(model.deleteProtocolFx.pending)

  useGate(model.Gate)

  const handleOpenConfirm = async (id: string) => {
    try {
      await openConfirm()

      await model.deleteProtocolFx(id)
    } catch (error) {
      console.error(error.message)
    }
  }

  const protocols = useMemo(
    () =>
      protocolList.list?.filter((protocol) => ability.can('read', protocol)),
    [protocolList, ability]
  )

  return (
    <MainLayout>
      <Can I="create" an="Protocol">
        <Button
          component={ReactRouterLink}
          variant="contained"
          color="primary"
          to={paths.protocols.create}
        >
          New protocol
        </Button>
      </Can>
      <ul className={classes.root}>
        {loading && (
          <li>
            <Paper className={classes.card}>loading...</Paper>
          </li>
        )}
        {!loading && !protocols?.length && (
          <li>
            <Paper className={classes.card}>no protocols found</Paper>
          </li>
        )}
        {!loading &&
          protocols &&
          protocols.map((protocol) => (
            <li key={protocol.id} className={classes.item}>
              <ReactRouterLink
                to={paths.protocols.detail(protocol.id)}
                className={classes.link}
              >
                <Paper className={classes.card}>
                  <div className={classes.mr}>{protocol.name}</div>
                  <div className={`${classes.mr} ${classes.tokens}`}>
                    {protocol.createdAt}
                  </div>
                </Paper>
              </ReactRouterLink>
              <Can I="update" a="Protocol">
                <Button
                  variant="contained"
                  color="primary"
                  component={ReactRouterLink}
                  to={paths.protocols.update(protocol.id)}
                  className={classes.edit}
                  disabled={deleteLoading}
                >
                  Edit
                </Button>
              </Can>
              <Can I="delete" a="Protocol">
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={deleteLoading}
                  onClick={() => handleOpenConfirm(protocol.id)}
                >
                  Delete
                </Button>
              </Can>
            </li>
          ))}
      </ul>
    </MainLayout>
  )
}
