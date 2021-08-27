/* eslint-disable jsx-a11y/label-has-associated-control */
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { useLocalStorage } from 'react-use'

import { ReactComponent as LogoMini } from '~/assets/icons/logo-mini.svg'
import { Link } from '~/common/link'
import { paths } from '~/paths'
import { ButtonBase } from '~/common/button-base'
import { Button } from '~/common/button'
import { cutAccount } from '~/common/cut-account'
import { Typography } from '~/common/typography'
import { Paper } from '~/common/paper'
import { config } from '~/config'
import * as styles from './layout-sidebar.css'
import { Icon } from '~/common/icon'
import { useTheme } from '~/common/theme/theme.context'

type MenuItem = {
  title: string
  path: string
  icon: 'home'
  exact?: boolean
}

export type LayoutHeaderProps = {
  onConnect?: () => void
  account?: string | null
  onChangeWallet?: () => void
  menu: MenuItem[]
}

export const LayoutSidebar: React.FC<LayoutHeaderProps> = (props) => {
  const [settingsOpened, setSettingsOpen] = useState(false)

  const [hided, setHide] = useLocalStorage('dfh:sidebar', false)

  const [currentTheme, setTheme, removeTheme] = useTheme()

  const handleSettingsOpen = () => {
    setSettingsOpen(!settingsOpened)
  }

  const handleSettingsBlur = () => {
    setSettingsOpen(false)
  }

  const handleChangeTheme = (variant: 'dark' | 'light') => () => {
    setTheme(variant)
  }

  const handleHide = () => {
    setHide(!hided)
  }

  return (
    <div className={styles.root}>
      <ButtonBase
        onClick={handleHide}
        className={clsx(styles.hideButton, {
          [styles.hidedHideButton]: hided,
        })}
      >
        {hided ? 'hided' : 'hide'}
      </ButtonBase>
      <aside
        className={clsx(styles.aside, {
          [styles.hided]: hided,
        })}
      >
        <Link href={config.MAIN_URL || paths.main} className={styles.logo}>
          <LogoMini className={styles.logoIcon} />
        </Link>
        <div className={styles.actions}>
          {props.account ? (
            <Paper
              onClick={props.onChangeWallet}
              className={styles.wallet}
              as={ButtonBase}
            >
              <Jazzicon
                diameter={20}
                seed={jsNumberForAddress(props.account)}
              />
              {!hided && (
                <Typography
                  variant="body2"
                  family="mono"
                  transform="uppercase"
                  className={styles.account}
                >
                  {cutAccount(props.account)}
                </Typography>
              )}
            </Paper>
          ) : (
            <Button color="green" onClick={props.onConnect}>
              {hided ? 'C' : 'Connect Wallet'}
            </Button>
          )}
        </div>
        <div className={styles.actions}>{props.children}</div>
        <ul className={styles.menu}>
          {props.menu.map((menuItem) => (
            <li key={menuItem.title}>
              <NavLink
                className={styles.link}
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
        <div className={styles.settingsWrap}>
          <Paper
            as={ButtonBase}
            className={styles.settings}
            onClick={handleSettingsOpen}
            onBlur={handleSettingsBlur}
          >
            <Icon
              icon="settings"
              width="24"
              height="24"
              className={styles.settingsIcon}
            />
            {!hided && (
              <Icon
                icon="settingsArrow"
                width="12"
                height="8"
                className={styles.settingsIconArrow}
              />
            )}
          </Paper>
          {settingsOpened && (
            <div className={styles.settingsDropdown}>
              <label>
                <input
                  type="radio"
                  id="dark"
                  name="theme"
                  checked={currentTheme === 'dark'}
                  value="dark"
                  onMouseDown={handleChangeTheme('dark')}
                  onChange={handleChangeTheme('dark')}
                />
                dark
              </label>
              <label>
                <input
                  type="radio"
                  id="light"
                  name="theme"
                  checked={currentTheme === 'light'}
                  value="light"
                  onMouseDown={handleChangeTheme('light')}
                  onChange={handleChangeTheme('light')}
                />
                light
              </label>
              <label>
                <input
                  type="radio"
                  id="system"
                  name="theme"
                  checked={currentTheme === undefined}
                  value="system"
                  onMouseDown={removeTheme}
                  onChange={removeTheme}
                />
                system
              </label>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
