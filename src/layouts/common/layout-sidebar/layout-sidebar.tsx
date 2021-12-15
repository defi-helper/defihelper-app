import { NavLink, Link as ReactRouerLink } from 'react-router-dom'
import clsx from 'clsx'

import { Link } from '~/common/link'
import { paths } from '~/paths'
import { ButtonBase } from '~/common/button-base'
import { Button } from '~/common/button'
import { config } from '~/config'
import { LayoutThemeSwitcher } from '~/layouts/common/layout-theme-switcher'
import { Icon } from '~/common/icon'
import { SOCIAL_LINKS } from '../constants'
import { LayoutCurrencySwitcher } from '../layout-currency-switcher'
import * as styles from './layout-sidebar.css'
import { Dropdown } from '~/common/dropdown'

type MenuItem = {
  title: string
  path: string
  icon: 'home' | 'grid' | 'energy' | 'notification' | 'check' | 'settings'
  exact?: boolean
}

export type LayoutHeaderProps = {
  menu: MenuItem[]
  onLogout?: () => void
  hidden?: boolean
  className?: string
}

export const LayoutSidebar: React.VFC<LayoutHeaderProps> = (props) => {
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
            Please note, we are currently in our Beta state. Some
            functionalities may not work as expected
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
      <div className={styles.spacer} />
      {!props.hidden && (
        <div className={styles.switchers}>
          <LayoutThemeSwitcher />
          <LayoutCurrencySwitcher />
        </div>
      )}
      <div className={clsx(styles.social, props.hidden && styles.socialHidden)}>
        {SOCIAL_LINKS.map((link) => (
          <Link
            key={link.icon}
            href={link.link}
            target="_blank"
            className={clsx(
              styles.socailLink,
              props.hidden && styles.socailLinkHidden
            )}
          >
            <Icon icon={link.icon} className={styles.socialIcon} />
          </Link>
        ))}
      </div>
      {!props.hidden && (
        <Button
          as={ReactRouerLink}
          to={paths.governance.list}
          variant="outlined"
          size="small"
          className={styles.govButton}
        >
          Governance
        </Button>
      )}
      {props.onLogout && !props.hidden && (
        <ButtonBase className={styles.logout} onClick={props.onLogout}>
          Log Out
        </ButtonBase>
      )}
    </aside>
  )
}
