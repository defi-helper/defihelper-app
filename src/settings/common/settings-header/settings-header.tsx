import clsx from 'clsx'

import * as styles from './settings-header.css'

export type SettingsHeaderProps = {
  className?: string
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = (props) => {
  return (
    <div className={clsx(styles.root, props.className)}>{props.children}</div>
  )
}
