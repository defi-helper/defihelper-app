import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

const sidebarWidth = 240

const hiddenSidebarWidth = 57

export const root = style({
  padding: '40px 16px 16px',
  width: sidebarWidth,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflowX: 'hidden',
  overflowY: 'auto',
})

export const hidden = style({
  width: hiddenSidebarWidth,
  padding: '40px 8px 8px',
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

export const linkHidden = style({
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

export const socialHidden = style({
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

export const socailLinkHidden = style({
  padding: '12px 0',
})

export const socialIcon = style({
  width: 20,
  height: 20,
  margin: '0 6px',
})

export const switchers = style({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: '1fr 1fr',
  gap: 16,
})

export const govButton = style({
  borderColor: theme.colors.border,
  minHeight: 32,
})

export const logout = style({
  fontFamily: theme.fonts.mono,
  textTransform: 'uppercase',
  fontSize: 14,
  lineHeight: '20px',
  opacity: 0.64,
  transition: 'opacity .3s ease-in-out',
  marginTop: 16,

  '@media': {
    [theme.mediaQueries.hover()]: {
      ':hover': {
        opacity: 1,
      },
    },
  },
})
