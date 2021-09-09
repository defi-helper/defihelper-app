import { Link as ReactRouterLink, useLocation } from 'react-router-dom'
import { useStore, useGate } from 'effector-react'
import { useMemo } from 'react'
import clsx from 'clsx'

import { AppLayout } from '~/layouts'
import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import { paths } from '~/paths'
import { Can, useAbility } from '~/users'
import { useDialog } from '~/common/dialog'
import { ConfirmDialog } from '~/common/confirm-dialog'
import * as styles from './protocol-list.css'
import * as model from './protocol-list.model'
import { Typography } from '~/common/typography'
import { Icon } from '~/common/icon'
import { Input } from '~/common/input'
import { ProtocolTabs } from '../common'

export type ProtocolListProps = unknown

export const ProtocolList: React.VFC<ProtocolListProps> = () => {
  const location = useLocation()

  const ability = useAbility()

  const [openConfirm] = useDialog(ConfirmDialog)

  const loading = useStore(model.fetchProtocolListFx.pending)
  const protocolList = useStore(model.$protocolList)

  const handleOpenConfirm = async (id: string) => {
    try {
      await openConfirm()

      await model.deleteProtocolFx(id)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const protocols = useMemo(
    () => protocolList.filter((protocol) => ability.can('read', protocol)),
    [protocolList, ability]
  )

  useGate(model.ProtocolListGate, location.pathname)

  return (
    <AppLayout>
      <div className={styles.root}>
        <div className={styles.header}>
          <Typography variant="h3" family="square">
            Protocols
          </Typography>
          {false && ( // TODO: hide for now
            <>
              <ProtocolTabs />
              <div>
                <Input placeholder="Search" />
              </div>
            </>
          )}
          <Can I="create" a="Protocol">
            <Button
              as={ReactRouterLink}
              variant="contained"
              color="blue"
              to={paths.protocols.create}
            >
              <Icon icon="plus" height="24" width="24" />
            </Button>
          </Can>
        </div>
        <ul className={styles.protocols}>
          {loading && (
            <li>
              <Paper className={styles.card} radius={8}>
                loading...
              </Paper>
            </li>
          )}
          {!loading && !protocols?.length && (
            <li>
              <Paper className={styles.card} radius={8}>
                no protocols found
              </Paper>
            </li>
          )}
          {!loading &&
            protocols &&
            protocols.map((protocol) => (
              <li key={protocol.id} className={styles.item}>
                <Paper
                  as={ReactRouterLink}
                  to={paths.protocols.detail(protocol.id)}
                  className={clsx(styles.link, styles.card)}
                  radius={8}
                >
                  {protocol.icon && (
                    <img
                      src={protocol.icon}
                      alt={protocol.name}
                      width="30"
                      height="30"
                      className={styles.mr}
                    />
                  )}
                  <div className={styles.mr}>{protocol.name}</div>
                  <div className={`${styles.mr} ${styles.tokens}`}>
                    {protocol.createdAt}
                  </div>
                </Paper>
                <Can I="update" a="Protocol">
                  <Button
                    variant="contained"
                    color="primary"
                    as={ReactRouterLink}
                    to={paths.protocols.update(protocol.id)}
                    disabled={protocol.deleting}
                  >
                    Edit
                  </Button>
                </Can>
                <Can I="delete" a="Protocol">
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={protocol.deleting}
                    onClick={() => handleOpenConfirm(protocol.id)}
                  >
                    Delete
                  </Button>
                </Can>
              </li>
            ))}
        </ul>
        <model.ProtocolListPagination />
      </div>
    </AppLayout>
  )
}
