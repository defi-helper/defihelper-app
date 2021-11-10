import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
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

  return (
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
        {props.favorites} Favourite
      </ButtonBase>
    </Paper>
  )
}
