import clsx from 'clsx'
import { Switch } from '~/common/switch'
import * as styles from './layout-demo-switcher.css'

export type LayoutThemeSwitcherProps = {
  className?: string
  state: boolean
  onToggleDemo?: () => void
}

export const LayoutDemoSwitcher: React.VFC<LayoutThemeSwitcherProps> = (
  props
) => {
  return (
    <div className={clsx(styles.root, props.className)}>
      <span>Simulation</span>
      <Switch checked={props.state} onChange={props.onToggleDemo} />
    </div>
  )
}
