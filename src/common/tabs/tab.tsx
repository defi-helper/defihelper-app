import clsx from 'clsx'

import { ButtonBase } from '../button-base'
import * as styles from './tabs.css'

export type TabProps = {
  className?: string
  onClick?: () => void
  active?: boolean
}

export const Tab: React.FC<TabProps> = (props) => {
  return (
    <ButtonBase
      className={clsx(styles.tab, props.active && styles.tabActive)}
      onClick={props.onClick}
    >
      {props.children}
    </ButtonBase>
  )
}

Tab.displayName = 'Tab'
