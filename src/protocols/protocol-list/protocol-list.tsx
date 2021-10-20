import { Link as ReactRouterLink } from 'react-router-dom'
import { useStore, useGate } from 'effector-react'
import { useMemo, useState } from 'react'
import clsx from 'clsx'

import { Head } from '~/common/head'
import { AppLayout } from '~/layouts'
import { ButtonBase } from '~/common/button-base'
import { Button } from '~/common/button'
import { paths } from '~/paths'
import { Can, useAbility } from '~/users'
import { useDialog } from '~/common/dialog'
import { ConfirmDialog } from '~/common/confirm-dialog'
import { Typography } from '~/common/typography'
import { Icon } from '~/common/icon'
import { Input } from '~/common/input'
import { ProtocolTabs } from '../common'
import { Paper } from '~/common/paper'
import { Dropdown } from '~/common/dropdown'
import { bignumberUtils } from '~/common/bignumber-utils'
import * as model from './protocol-list.model'
import * as styles from './protocol-list.css'

export type ProtocolListProps = unknown

export const ProtocolList: React.VFC<ProtocolListProps> = () => {
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

  useGate(model.ProtocolListGate)

  const [favourites, setFavourite] = useState<Record<string, boolean>>({})

  const handleFavourite = (protocolId: string) => () => {
    setFavourite({ ...favourites, [protocolId]: !favourites[protocolId] })
  }

  return (
    <AppLayout>
      <Head title="Protocols" />
      <div className={styles.root}>
        <div className={styles.header}>
          <Typography variant="h3" family="square">
            Protocols
          </Typography>
          <ProtocolTabs className={styles.tabs} />
          <Input placeholder="Search" className={styles.search} />
          <Can I="create" a="Protocol">
            <Button
              as={ReactRouterLink}
              variant="contained"
              color="blue"
              to={paths.protocols.create}
              className={styles.create}
            >
              <Icon icon="plus" height="24" width="24" />
            </Button>
          </Can>
        </div>
        <div className={styles.proposalsHeader}>
          <Typography variant="body2" className={styles.name}>
            Name
          </Typography>
          <Typography variant="body2">Protocol TVL</Typography>
          <Typography variant="body2">My APR</Typography>
          <Typography variant="body2">My position</Typography>
          <Typography variant="body2">My profit Daily</Typography>
        </div>
        <ul className={styles.protocols}>
          {loading && (
            <li>
              <Paper radius={8}>loading...</Paper>
            </li>
          )}
          {!loading && !protocols?.length && (
            <li>
              <Paper radius={8}>no protocols found</Paper>
            </li>
          )}
          {!loading &&
            protocols &&
            protocols.map((protocol) => (
              <li key={protocol.id} className={styles.item}>
                <Paper className={clsx(styles.card)} radius={8}>
                  <div className={styles.favorite}>-</div>
                  {false && (
                    <ButtonBase
                      className={clsx(
                        styles.favorite,
                        favourites[protocol.id] && styles.favoriteActive
                      )}
                      onClick={handleFavourite(protocol.id)}
                    >
                      <Icon icon="star" />
                    </ButtonBase>
                  )}
                  <Typography
                    as={ReactRouterLink}
                    to={paths.protocols.detail(protocol.id)}
                    variant="body2"
                    className={clsx(styles.link)}
                  >
                    {protocol.icon && (
                      <img
                        src={protocol.icon}
                        alt={protocol.name}
                        width="24"
                        height="24"
                        className={styles.logo}
                      />
                    )}
                    {protocol.name}
                  </Typography>
                  <Typography variant="body2" as="span">
                    ${bignumberUtils.format(protocol.metricChart?.[0]?.avg)}
                  </Typography>
                  <Typography variant="body2" as="span">
                    -
                  </Typography>
                  <Typography variant="body2" as="span">
                    -
                  </Typography>
                  <Typography
                    variant="body2"
                    as="span"
                    className={styles.profit}
                  >
                    -
                    <Can I="update" a="Protocol">
                      <Dropdown
                        control={
                          <ButtonBase className={styles.manage}>
                            <Icon icon="dots" />
                          </ButtonBase>
                        }
                      >
                        <Can I="update" a="Protocol">
                          <ButtonBase
                            as={ReactRouterLink}
                            to={paths.protocols.update(protocol.id)}
                            className={styles.manageDropdownItem}
                          >
                            Edit
                          </ButtonBase>
                        </Can>
                        <Can I="delete" a="Protocol">
                          <ButtonBase
                            disabled={protocol.deleting}
                            onClick={() => handleOpenConfirm(protocol.id)}
                            className={styles.manageDropdownItem}
                          >
                            Delete
                          </ButtonBase>
                        </Can>
                      </Dropdown>
                    </Can>
                  </Typography>
                </Paper>
              </li>
            ))}
        </ul>
        <model.ProtocolListPagination />
      </div>
    </AppLayout>
  )
}
