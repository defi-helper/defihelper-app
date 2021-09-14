import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { useTheme } from '~/common/theme'
import * as styles from './layout-theme-switcher.css'

export type LayoutThemeSwitcherProps = {
  className?: string
}

export const LayoutThemeSwitcher: React.VFC<LayoutThemeSwitcherProps> = (
  props
) => {
  const [currentTheme, setTheme] = useTheme()

  const handleChangeTheme = (variant: 'dark' | 'light') => () => {
    setTheme(variant)
  }

  return (
    <div className={clsx(styles.root, props.className)}>
      <ButtonBase
        onClick={handleChangeTheme('dark')}
        className={clsx(
          styles.button,
          currentTheme === 'dark' && styles.active
        )}
      >
        <Icon icon="moon" className={styles.icon} />
      </ButtonBase>
      <ButtonBase
        onClick={handleChangeTheme('light')}
        className={clsx(
          styles.button,
          currentTheme === 'light' && styles.active
        )}
      >
        <Icon icon="sun" className={styles.icon} />
      </ButtonBase>
    </div>
  )
}
