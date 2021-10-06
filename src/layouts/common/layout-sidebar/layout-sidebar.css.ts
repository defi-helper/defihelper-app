import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

const sidebarWidth = 240

const hidedSidebarWidth = 57

export const root = style({
  position: 'relative',
})

export const aside = style({
  padding: '40px 16px 16px',
  width: sidebarWidth,
  borderRight: `1px solid ${theme.colors.separator}`,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflowX: 'hidden',
  overflowY: 'auto',
  position: 'sticky',
  top: 0,
})

export const hideButton = style({
  position: 'fixed',
  top: 8,
  left: sidebarWidth - 12,
  zIndex: 10,
  width: 24,
  height: 24,
  border: `1px solid ${theme.colors.separator}`,
  background: theme.colors.background,
  boxSizing: 'border-box',
  borderRadius: 4,
})

export const hideButtonHided = style({
  left: hidedSidebarWidth - 12,
})

export const hided = style({
  width: hidedSidebarWidth,
  padding: '40px 8px 8px',
})

export const doubleArrow = style({
  width: 16,
  height: 16,
  opacity: 0.64,
})

export const doubleArrowReverted = style({
  transform: 'rotate(180deg)',
})

export const logo = style({
  margin: '0 auto 32px',
})

export const logoIcon = style({
  display: 'block',
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
  padding: '8px 16px',
  width: '100%',
  opacity: 0.64,
  verticalAlign: 'middle',
  alignItems: 'center',
})

export const linkHided = style({
  padding: 8,
})

export const menuIcon = style({})

export const menuTitle = style({
  marginLeft: 8,
})

export const active = style({
  borderRadius: 8,
  backgroundColor: theme.colors.paper,
  opacity: 1,
})

export const spacer = style({
  margin: 'auto',
  minHeight: 40,
})

export const social = style({
  minHeight: 52,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const socialHided = style({
  flexDirection: 'column',
  height: 'auto',
  marginTop: 'auto',
})

export const socailLink = style({
  opacity: 0.4,

  '@media': {
    [theme.mediaQueries.hover()]: {
      ':hover': {
        opacity: 1,
      },
    },
  },
})

export const socialIcon = style({
  width: 20,
  height: 20,
  margin: '0 6px',
})

export const switchers = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const govButton = style({
  borderColor: theme.colors.border,
})
