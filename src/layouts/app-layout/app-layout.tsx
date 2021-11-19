import { useStore } from 'effector-react'
import { useLocalStorage } from 'react-use'
import clsx from 'clsx'
import { useState } from 'react'

import { paths } from '~/paths'
import { LayoutSidebar, LayoutContainer } from '../common'
import { authModel } from '~/auth'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { useBodyScrollLock } from '~/common/hooks'
import * as styles from './app-layout.css'

export type AppLayoutProps = {
  title?: React.ReactNode
  action?: React.ReactNode
}

const MENU = [
  {
    title: 'Portfolio',
    path: paths.portfolio as string,
    icon: 'home' as const,
  },
  {
    title: 'Protocols',
    path: paths.protocols.list as string,
    icon: 'grid' as const,
  },
  {
    title: 'Automations',
    path: paths.automations.list,
    icon: 'energy' as const,
  },
  {
    title: 'Roadmap',
    path: paths.roadmap.list as string,
    icon: 'check' as const,
  },
  {
    title: 'Settings',
    path: paths.settings.list,
    icon: 'settings' as const,
  },
]

export const AppLayout: React.FC<AppLayoutProps> = (props) => {
  const user = useStore(authModel.$user)

  const [hidden, setHide] = useLocalStorage('dfh:sidebar', false)

  const [openSidebar, setOpenSidebar] = useState(false)
  const [sidebar, setSidebar] = useState<HTMLDivElement | null>(null)

  const handleHideSidebar = () => {
    setHide(!hidden)
  }

  const handleLogout = () => {
    authModel.logoutFx()
  }

  const handleToggleSidebar = () => {
    setOpenSidebar(!openSidebar)
  }

  useBodyScrollLock(sidebar)

  return (
    <div className={styles.root}>
      <div className={styles.sidebarDesktop}>
        <LayoutSidebar
          menu={MENU}
          onLogout={user ? handleLogout : undefined}
          hidden={hidden}
        />
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
            <Icon icon="burger" width="24" height="24" />
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
            <Icon icon="close" width="24" height="24" />
          </ButtonBase>
          <LayoutSidebar
            menu={MENU}
            onLogout={user ? handleLogout : undefined}
            hidden={false}
            className={styles.sidebarMobileInner}
          />
        </div>
      )}
      <LayoutContainer>{props.children}</LayoutContainer>
    </div>
  )
}
