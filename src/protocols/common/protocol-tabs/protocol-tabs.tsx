import clsx from 'clsx'
import { useMedia } from 'react-use'

import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Tabs } from '../protocol.types'
import * as styles from './protocol-tabs.css'

export type ProtocolTabsProps = {
  className?: string
  all: number
  favorites: number
  fullSupport: number
  onChange: (value: Tabs) => void
  value: Tabs
}

export const ProtocolTabs: React.VFC<ProtocolTabsProps> = (props) => {
  const handleChangeTab = (tab: Tabs) => () => {
    props.onChange(tab)
  }

  const isDesktop = useMedia('(min-width: 960px)')

  const tabs = [
    {
      value: Tabs.All,
      title: 'All',
      count: props.all,
    },
    {
      value: Tabs.FullSupport,
      title: 'Full-support',
      count: props.fullSupport,
    },
    {
      value: Tabs.Favorite,
      title: 'Favorites',
      count: props.favorites,
    },
  ]

  const mobile = (
    <Dropdown
      control={(active) => (
        <ButtonBase className={styles.select}>
          {tabs[0].title}{' '}
          <Icon
            icon={active ? 'arrowUp' : 'arrowDown'}
            width="12"
            height="12"
          />
        </ButtonBase>
      )}
      offset={[0, 8]}
      className={styles.dropdown}
    >
      {tabs.map((tab) => (
        <ButtonBase
          className={styles.selectFz}
          onClick={handleChangeTab(tab.value)}
        >
          {tab.title}
        </ButtonBase>
      ))}
    </Dropdown>
  )

  const desktop = (
    <Paper className={clsx(styles.root, props.className)}>
      {tabs.map((tab) => (
        <ButtonBase
          className={clsx(
            styles.tab,
            props.value === tab.value && styles.active
          )}
          onClick={handleChangeTab(tab.value)}
        >
          {tab.count} {tab.title}
        </ButtonBase>
      ))}
    </Paper>
  )

  return isDesktop ? desktop : mobile
}
