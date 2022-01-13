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
  onChange: (value: Tabs) => void
  value: Tabs
}

export const ProtocolTabs: React.VFC<ProtocolTabsProps> = (props) => {
  const handleChangeTab = (tab: Tabs) => () => {
    props.onChange(tab)
  }

  const isDesktop = useMedia('(min-width: 960px)')

  const mobile = (
    <Dropdown
      control={(active) => (
        <ButtonBase className={styles.select}>
          All{' '}
          <Icon
            icon={active ? 'arrowTop' : 'arrowDown'}
            width="12"
            height="12"
          />
        </ButtonBase>
      )}
      offset={[0, 8]}
      className={styles.dropdown}
    >
      <ButtonBase
        className={styles.selectFz}
        onClick={handleChangeTab(Tabs.All)}
      >
        All
      </ButtonBase>
      <ButtonBase
        className={styles.selectFz}
        onClick={handleChangeTab(Tabs.Favourite)}
      >
        Favorites
      </ButtonBase>
    </Dropdown>
  )

  const desktop = (
    <Paper className={clsx(styles.root, props.className)}>
      <ButtonBase
        className={clsx(styles.tab, props.value === Tabs.All && styles.active)}
        onClick={handleChangeTab(Tabs.All)}
      >
        {props.all} All
      </ButtonBase>
      <ButtonBase
        className={clsx(
          styles.tab,
          props.value === Tabs.Favourite && styles.active
        )}
        onClick={handleChangeTab(Tabs.Favourite)}
      >
        {props.favorites} Favorites
      </ButtonBase>
    </Paper>
  )

  return isDesktop ? desktop : mobile
}
