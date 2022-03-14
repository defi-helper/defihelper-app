import { Link as ReactRouterLink, useHistory } from 'react-router-dom'
import { useStore, useGate } from 'effector-react'
import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'

import { Head } from '~/common/head'
import { AppLayout } from '~/layouts'
import { Button } from '~/common/button'
import { paths } from '~/paths'
import { authModel, Can, useAbility } from '~/auth'
import { useDialog } from '~/common/dialog'
import { ConfirmDialog } from '~/common/confirm-dialog'
import { Typography } from '~/common/typography'
import { Icon } from '~/common/icon'
import { Input } from '~/common/input'
import { useDebounce, useQueryParams } from '~/common/hooks'
import { SearchDialog } from '~/common/search-dialog'
import { Protocol, ProtocolCard, ProtocolTabs, Tabs } from '../common'
import { Paper } from '~/common/paper'
import { ButtonBase } from '~/common/button-base'
import { Loader } from '~/common/loader'
import { Select, SelectOption } from '~/common/select'
import * as model from './protocol-list.model'
import * as styles from './protocol-list.css'

export type ProtocolListProps = unknown

const options = {
  all: 'All',
  full: 'Full support',
  balances: 'Only balances',
}

export const ProtocolList: React.VFC<ProtocolListProps> = () => {
  const [search, setSearch] = useState('')
  const [currentTab, setCurrentTab] = useState(Tabs.All)

  const history = useHistory()
  const searchParams = useQueryParams()

  const [currentOption, setOption] = useState(
    searchParams.get('filter') ?? options.all
  )

  const [openSearchDialog] = useDialog(SearchDialog)

  const ability = useAbility()
  const user = useStore(authModel.$user)

  const [openConfirm] = useDialog(ConfirmDialog)

  const loading = useStore(model.fetchProtocolListFx.pending)
  const userReady = useStore(authModel.$userReady)
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

  const searchDebounced = useDebounce(search, 1000)

  const debank = useMemo(() => {
    if (currentOption === options.all) return undefined

    return currentOption === options.balances
  }, [currentOption])

  useGate(model.ProtocolListGate, {
    favorite:
      currentTab === Tabs.All ? undefined : currentTab === Tabs.Favourite,
    search: searchDebounced,
    hidden: ability.can('update', 'Protocol') ? null : false,
    debank,
  })

  useEffect(() => {
    history.replace({ search: `filter=${currentOption}` })
  }, [currentOption, history])

  const handleFavorite = (protocol: Protocol) => () => {
    model.protocolFavoriteFx({
      protocol: protocol.id,
      favorite: !protocol.favorite,
    })
  }

  const handleSearchMobile = async () => {
    try {
      const result = await openSearchDialog()

      setSearch(result)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
  }

  const [sentryRef] = model.useInfiniteScroll()
  const hasNetPage = useStore(model.useInfiniteScroll.hasNextPage)

  const tabs = (
    <ProtocolTabs
      className={styles.tabs}
      all={tabsCount.all}
      favorites={tabsCount.favorites}
      onChange={setCurrentTab}
      value={currentTab}
    />
  )

  return (
    <AppLayout
      title="Protocols"
      action={
        <div className={styles.action}>
          {tabs}
          <ButtonBase
            className={styles.searchButton}
            onClick={handleSearchMobile}
          >
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
          {tabs}
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
        <Select
          value={currentOption}
          onChange={({ target }) => setOption(target.value)}
          className={styles.select}
        >
          {Object.entries(options).map(([key, value]) => (
            <SelectOption key={key} value={value}>
              {value}
            </SelectOption>
          ))}
        </Select>
        <div className={styles.proposalsHeader}>
          <Typography variant="body2" className={styles.name}>
            Name
          </Typography>
          <Typography variant="body2" align="right">
            Protocol TVL
          </Typography>
          <Typography variant="body2" align="right">
            My APY
          </Typography>
          <Typography variant="body2" align="right">
            My position
          </Typography>
          <Typography variant="body2" align="right" className={styles.profit}>
            My profit
          </Typography>
        </div>
        <ul className={styles.protocols}>
          {!loading && !protocolList?.length && userReady && (
            <li>
              <Paper radius={8} className={styles.empty}>
                No protocols found
              </Paper>
            </li>
          )}
          {protocolList.map((protocol) => (
            <li
              key={protocol.id}
              className={clsx(
                styles.item,
                protocol.hidden && styles.hiddenItem
              )}
            >
              <ProtocolCard
                protocol={protocol}
                onFavorite={user ? handleFavorite(protocol) : undefined}
                onDelete={handleOpenConfirm(protocol.id)}
              />
            </li>
          ))}
          {(hasNetPage || !userReady || loading) && (
            <li>
              <div className={styles.loader} ref={sentryRef}>
                <Loader height="36" />
              </div>
            </li>
          )}
        </ul>
      </div>
    </AppLayout>
  )
}
