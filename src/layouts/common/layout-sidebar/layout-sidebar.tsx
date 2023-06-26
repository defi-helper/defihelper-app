import { NavLink } from 'react-router-dom'
import clsx from 'clsx'

import { Link } from '~/common/link'
import { paths } from '~/paths'
import { ButtonBase } from '~/common/button-base'
import { config } from '~/config'
import { LayoutThemeSwitcher } from '~/layouts/common/layout-theme-switcher'
import { Icon, IconProps } from '~/common/icon'
import { SOCIAL_LINKS } from '../constants'
import { Dropdown } from '~/common/dropdown'
import { LayoutDemoSwitcher } from '~/layouts/common/layout-demo-switcher'
import * as styles from './layout-sidebar.css'
import { Can } from '~/auth'

type MenuItem = {
  title: string
  path: string
  icon: IconProps['icon']
  exact?: boolean
}

export type LayoutHeaderProps = {
  menu: MenuItem[]
  isDemo: boolean
  onToggleDemo?: () => void
  hidden?: boolean
  className?: string
}

export const LayoutSidebar: React.FC<LayoutHeaderProps> = (props) => {
  return (
    <aside
      className={clsx(
        styles.root,
        {
          [styles.hidden]: props.hidden,
        },
        props.className
      )}
    >
      <div className={styles.logo}>
        <Link href={config.MAIN_URL || paths.main}>
          <Icon
            icon={props.hidden ? 'logoMini' : 'logo'}
            className={styles.logoIcon}
          />
        </Link>
        {!props.hidden && (
          <Dropdown
            className={styles.dropdown}
            placement="bottom-end"
            offset={[0, 28]}
            trigger="hover"
            control={
              <ButtonBase className={styles.betaIcon}>
                <Icon icon="beta" />
              </ButtonBase>
            }
          >
            The DeFiHelper app is currently in the public beta stage. Though we
            try our best, you may encounter some bugs or other issues. If you
            find any errors or have difficulty in understanding any part of the
            service, please write to us in Telegram, Discord or via email
            <Link
              href="mailto: hello@defihelper.io"
              target="_blank"
              underline="always"
            >
              hello@defihelper.io
            </Link>
            .
          </Dropdown>
        )}
      </div>
      <ul className={styles.menu}>
        {props.menu.map((menuItem) => (
          <li key={menuItem.title}>
            <NavLink
              className={clsx(styles.link, props.hidden && styles.linkHidden)}
              activeClassName={styles.active}
              to={menuItem.path}
            >
              <Icon
                icon={menuItem.icon}
                width="24"
                height="24"
                className={styles.menuIcon}
              />
              {!props.hidden && (
                <span className={styles.menuTitle}>{menuItem.title}</span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
      {!props.hidden && props.children}
      <div className={styles.spacer} />

      {!props.hidden && (
        <Can I="read" a="User">
          <div className={styles.switchers}>
            <LayoutDemoSwitcher
              onToggleDemo={props.onToggleDemo}
              state={props.isDemo}
            />
          </div>
        </Can>
      )}
      {!props.hidden && (
        <div className={styles.switchers}>
          <LayoutThemeSwitcher />
        </div>
      )}
      <div className={clsx(styles.social, props.hidden && styles.socialHidden)}>
        {SOCIAL_LINKS.map(({ width = 20, height = 20, ...link }) => (
          <Link
            key={link.icon}
            href={link.link}
            target="_blank"
            className={clsx(
              styles.socailLink,
              props.hidden && styles.socailLinkHidden
            )}
          >
            <Icon
              icon={link.icon}
              width={width}
              height={height}
              className={styles.socialIcon}
            />
          </Link>
        ))}
      </div>
    </aside>
  )
}
