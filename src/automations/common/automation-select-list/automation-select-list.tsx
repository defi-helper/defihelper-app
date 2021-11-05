import clsx from 'clsx'

import * as styles from './automation-select-list.css'

export type AutomationSelectListProps = {
  className?: string
}

export const AutomationSelectList: React.FC<AutomationSelectListProps> = (
  props
) => {
  return (
    <ul className={clsx(styles.list, props.className)}>{props.children}</ul>
  )
}
