import { useStore } from 'effector-react'
import { useLocalStorage } from 'react-use'
import clsx from 'clsx'
import { useState } from 'react'

import { paths } from '~/paths'
import { LayoutSidebar, LayoutContainer, LayoutBreadcrumbs } from '../common'
import { authModel, useAbility } from '~/auth'
import { ButtonBase } from '~/common/button-base'
import { Icon, IconProps } from '~/common/icon'
import { useBodyScrollLock } from '~/common/hooks'
import { SettingsTelegram } from '~/settings/settings-telegram'
import * as styles from './app-layout.css'

export type AppLayoutProps = {
  title?: React.ReactNode
  action?: React.ReactNode
}

type MenuItem = {
  title: string
  path: string
  icon: IconProps['icon']
  subject?: 'User'
  can?: 'read'
}

const MENU: MenuItem[] = [
  {
    title: 'Portfolio',
    path: paths.portfolio,
    icon: 'home',
  },
  {
    title: 'Trade',
    path: paths.trade,
    icon: 'trade',
    subject: 'User',
    can: 'read',
  },
  {
    title: 'Invest',
    path: paths.invest.list,
    icon: 'autostaking',
  },
  {
    title: 'Protocols',
    path: paths.protocols.list,
    icon: 'grid',
    subject: 'User',
    can: 'read',
  },
  {
    title: 'Automations',
    path: paths.automations.list,
    icon: 'energy',
    subject: 'User',
    can: 'read',
  },
  {
    title: 'ZAP',
    path: paths.LPTokens,
    icon: 'automation',
    subject: 'User',
    can: 'read',
  },
  {
    title: 'Vote',
    path: paths.roadmap.list,
    icon: 'check',
  },
  {
    title: 'Settings',
    path: paths.settings.list,
    icon: 'settings',
  },
  {
    title: 'Bridge',
    path: paths.bridges,
    icon: 'bridges',
  },
  {
    title: 'Referral Program',
    path: paths.referral.list,
    icon: 'affiliate',
    subject: 'User',
    can: 'read',
  },
  {
    title: 'Admin',
    path: paths.admin,
    icon: 'grid',
    subject: 'User',
    can: 'read',
  },
]

export const AppLayout: React.FC<AppLayoutProps> = (props) => {
  const user = useStore(authModel.$user)

  const ability = useAbility()

  const [hidden, setHide] = useLocalStorage('sidebar', false)

  const [openSidebar, setOpenSidebar] = useState(false)
  const [sidebar, setSidebar] = useState<HTMLDivElement | null>(null)

  const handleHideSidebar = () => {
    setHide(!hidden)
  }

  const handleToggleDemo = () => {
    authModel.logoutFx()

    if (user?.role !== 'demo') {
      authModel.authDemoFx()
    }
  }

  const handleToggleSidebar = () => {
    setOpenSidebar(!openSidebar)
  }

  useBodyScrollLock(sidebar)

  const menu = MENU.filter((menuItem) => {
    return menuItem.subject && menuItem.can
      ? ability.can(menuItem.can, menuItem.subject)
      : true
  })

  return (
    <div className={styles.root}>
      <div className={styles.sidebarDesktop}>
        <LayoutSidebar
          menu={menu}
          onToggleDemo={handleToggleDemo}
          hidden={hidden}
          isDemo={user?.role === 'demo'}
        >
          {user && <SettingsTelegram />}
        </LayoutSidebar>
        <ButtonBase onClick={handleHideSidebar} className={styles.hideButton}>
          <Icon
            icon="doubleArrowLeft"
            className={clsx(styles.doubleArrow, {
              [styles.doubleArrowReverted]: hidden,
            })}
          />
        </ButtonBase>
      </div>
      <div className={styles.header}>
        <div className={styles.title}>
          <ButtonBase onClick={handleToggleSidebar}>
            <Icon icon="burger" width="40" height="40" />
          </ButtonBase>
          {props.title}
        </div>
        <div className={styles.action}>{props.action}</div>
      </div>
      {openSidebar && (
        <div ref={setSidebar} className={styles.sidebarMobile}>
          <ButtonBase
            onClick={handleToggleSidebar}
            className={styles.closeButton}
          >
            <Icon icon="close" width="40" height="40" />
          </ButtonBase>
          <LayoutSidebar
            menu={menu}
            onToggleDemo={handleToggleDemo}
            isDemo={user?.role === 'demo'}
            hidden={false}
            className={styles.sidebarMobileInner}
          >
            {user && <SettingsTelegram />}
          </LayoutSidebar>
        </div>
      )}
      <LayoutContainer hidden={hidden}>
        <LayoutBreadcrumbs className={styles.breadcrumbs}>
          {props.title}
        </LayoutBreadcrumbs>
        {props.children}
      </LayoutContainer>
    </div>
  )
}
