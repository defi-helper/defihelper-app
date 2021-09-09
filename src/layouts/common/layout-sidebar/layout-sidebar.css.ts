import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

const sidebarWidth = 239

const hidedSidebarWidth = 102

export const root = style({
  position: 'relative',
})

export const aside = style({
  padding: '16px 0',
  width: sidebarWidth,
  borderRight: `1px solid ${theme.colors.separator}`,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflowX: 'hidden',
  overflowY: 'auto',
  alignItems: 'flex-start',
  position: 'sticky',
  top: 0,

  '@media': {
    [theme.mediaQueries.lg()]: {
      padding: '34px 24px',
    },
  },
})

export const hideButton = style({
  position: 'absolute',
  top: 40,
  left: sidebarWidth + 40,
})

export const hidedHideButton = style({
  left: hidedSidebarWidth + 40,
})

export const hided = style({
  width: hidedSidebarWidth,
})

export const logo = style({
  marginBottom: 42,
})

export const logoIcon = style({
  display: 'block',
})

export const actions = style({
  marginBottom: 48,
})

export const wallet = style({
  borderRadius: 8,
  padding: '8px 12px',
})

export const account = style({
  marginLeft: 8,
})

export const menu = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  width: '100%',
  marginBottom: 48,
})

export const link = style({
  display: 'inline-flex',
  color: theme.colors.textColorPrimary,
  textDecoration: 'none',
  padding: '10px 14px',
  width: '100%',
  opacity: 0.64,
  verticalAlign: 'middle',
  alignItems: 'center',
})

export const menuIcon = style({})

export const menuTitle = style({
  marginLeft: 12,
})

export const active = style({
  borderRadius: 8,
  backgroundColor: theme.colors.paper,
  opacity: 1,
})

export const settingsWrap = style({
  position: 'relative',
  marginTop: 'auto',
})

export const settings = style({
  marginTop: 'auto',
  borderRadius: 8,
  padding: '9px 13px',
  position: 'relative',
})

export const settingsIcon = style({
  opacity: 0.64,
})

export const settingsIconArrow = style({
  opacity: 0.64,
  marginLeft: 9,
})

export const settingsDropdown = style({
  width: sidebarWidth,
  height: 100,
})
