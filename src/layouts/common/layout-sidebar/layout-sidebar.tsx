/* eslint-disable jsx-a11y/label-has-associated-control */
import { NavLink, Link as ReactRouerLink } from 'react-router-dom'
import clsx from 'clsx'
import { useLocalStorage } from 'react-use'
import { cloneElement } from 'react'

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

type MenuItem = {
  title: string
  path: string
  icon: 'home' | 'grid' | 'energy' | 'notification' | 'check' | 'settings'
  exact?: boolean
}

export type LayoutHeaderProps = {
  menu: MenuItem[]
  children: React.ReactElement
}

export const LayoutSidebar: React.VFC<LayoutHeaderProps> = (props) => {
  const [hided, setHide] = useLocalStorage('dfh:sidebar', false)

  const handleHide = () => {
    setHide(!hided)
  }

  return (
    <div className={styles.root}>
      <ButtonBase
        onClick={handleHide}
        className={clsx(styles.hideButton, hided && styles.hideButtonHided)}
      >
        <Icon
          icon="doubleArrowLeft"
          className={clsx(styles.doubleArrow, {
            [styles.doubleArrowReverted]: hided,
          })}
        />
      </ButtonBase>
      <aside
        className={clsx(styles.aside, {
          [styles.hided]: hided,
        })}
      >
        <Link href={config.MAIN_URL || paths.main} className={styles.logo}>
          <Icon
            icon={hided ? 'logoMini' : 'logo'}
            className={styles.logoIcon}
          />
        </Link>
        <div className={styles.actions}>
          {cloneElement(props.children, { hided })}
        </div>
        <ul className={styles.menu}>
          {props.menu.map((menuItem) => (
            <li key={menuItem.title}>
              <NavLink
                className={clsx(styles.link, hided && styles.linkHided)}
                activeClassName={styles.active}
                to={menuItem.path}
              >
                <Icon
                  icon={menuItem.icon}
                  width="24"
                  height="24"
                  className={styles.menuIcon}
                />
                {!hided && (
                  <span className={styles.menuTitle}>{menuItem.title}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={styles.spacer} />
        {!hided && (
          <div className={styles.switchers}>
            <LayoutThemeSwitcher />
            <LayoutCurrencySwitcher />
          </div>
        )}
        <div className={clsx(styles.social, hided && styles.socialHided)}>
          {SOCIAL_LINKS.map((link) => (
            <Link
              key={link.icon}
              href={link.link}
              target="_blank"
              className={styles.socailLink}
            >
              <Icon icon={link.icon} className={styles.socialIcon} />
            </Link>
          ))}
        </div>
        {!hided && (
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
      </aside>
    </div>
  )
}
