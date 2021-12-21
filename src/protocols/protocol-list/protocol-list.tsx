import { Link as ReactRouterLink } from 'react-router-dom'
import { useStore, useGate } from 'effector-react'
import { useMemo, useState } from 'react'

import { Head } from '~/common/head'
import { AppLayout } from '~/layouts'
import { Button } from '~/common/button'
import { paths } from '~/paths'
import { Can, useAbility } from '~/auth'
import { useDialog } from '~/common/dialog'
import { ConfirmDialog } from '~/common/confirm-dialog'
import { Typography } from '~/common/typography'
import { Icon } from '~/common/icon'
import { Input } from '~/common/input'
import { Protocol, ProtocolCard, ProtocolTabs, Tabs } from '../common'
import { Paper } from '~/common/paper'
import { ButtonBase } from '~/common/button-base'
import { Loader } from '~/common/loader'
import * as model from './protocol-list.model'
import * as styles from './protocol-list.css'

export type ProtocolListProps = unknown

export const ProtocolList: React.VFC<ProtocolListProps> = () => {
  const [search, setSearch] = useState('')
  const [currentTab, setCurrentTab] = useState(Tabs.All)

  const ability = useAbility()

  const [openConfirm] = useDialog(ConfirmDialog)

  const loading = useStore(model.fetchProtocolListFx.pending)
  const protocolList = useStore(model.$protocolList)
  const tabsCount = useStore(model.$tabsCount)

  const handleOpenConfirm = (protocolId: string) => async () => {
    try {
      await openConfirm()

      await model.deleteProtocolFx(protocolId)
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

  const hiddenProtocols = useMemo(
    () => protocolList.filter((protocol) => !ability.can('read', protocol)),
    [protocolList, ability]
  )

  useGate(model.ProtocolListGate, {
    favorite:
      currentTab === Tabs.All ? undefined : currentTab === Tabs.Favourite,
    search,
  })

  const handleFavorite = (protocol: Protocol) => () => {
    model.protocolFavoriteFx({
      protocol: protocol.id,
      favorite: !protocol.favorite,
    })
  }

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
  }

  const allTabs = tabsCount.all - hiddenProtocols.length

  return (
    <AppLayout
      title="Protocols"
      action={
        <div className={styles.action}>
          <ButtonBase className={styles.select}>
            All <Icon icon="arrowDown" width="12" height="12" />
          </ButtonBase>
          <ButtonBase className={styles.searchButton}>
            <Icon icon="search" width="16" height="16" />
          </ButtonBase>
          <Can I="create" a="Protocol">
            <Button
              as={ReactRouterLink}
              variant="contained"
              color="blue"
              to={paths.protocols.create}
              className={styles.createMobile}
            >
              +
            </Button>
          </Can>
        </div>
      }
    >
      <Head title="Protocols" />
      <div className={styles.root}>
        <div className={styles.header}>
          <Typography variant="h3" family="square">
            Protocols
          </Typography>
          <ProtocolTabs
            className={styles.tabs}
            all={allTabs < 0 ? 0 : allTabs}
            favorites={tabsCount.favorites}
            onChange={setCurrentTab}
            value={currentTab}
          />
          <Input
            placeholder="Search"
            className={styles.search}
            value={search}
            onChange={handleSearch}
          />
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
          <Typography variant="body2">My APY</Typography>
          <Typography variant="body2">My position</Typography>
          <Typography variant="body2">My profit</Typography>
        </div>
        <ul className={styles.protocols}>
          {loading && (
            <li>
              <div className={styles.loader}>
                <Loader height="36" />
              </div>
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
                <ProtocolCard
                  protocol={protocol}
                  onFavorite={handleFavorite(protocol)}
                  onDelete={handleOpenConfirm(protocol.id)}
                />
              </li>
            ))}
        </ul>
        <model.ProtocolListPagination />
      </div>
    </AppLayout>
  )
}
