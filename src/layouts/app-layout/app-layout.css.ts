import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  minHeight: '100vh',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'flex',
    },
  },
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  height: 40,
  marginBottom: 26,

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'none',
    },
  },
})

export const title = style({
  marginRight: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})

export const action = style({
  marginLeft: 'auto',
})

export const sidebarDesktop = style({
  position: 'sticky',
  top: 0,
  alignSelf: 'flex-start',
  display: 'none',
  borderRight: `1px solid ${theme.colors.separator}`,

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'block',
    },
  },
})

export const sidebarMobile = style({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 100,
  width: '100%',
  background: theme.colors.background,
})

export const sidebarMobileInner = style({
  width: '100%',
})

export const closeButton = style({
  position: 'absolute',
  top: 8,
  left: 16,
})

export const hideButton = style({
  width: 24,
  height: 24,
  border: `1px solid ${theme.colors.separator}`,
  background: theme.colors.background,
  boxSizing: 'border-box',
  borderRadius: 4,
  position: 'absolute',
  top: 8,
  right: -12,
})

export const doubleArrow = style({
  width: 16,
  height: 16,
  opacity: 0.64,
})

export const doubleArrowReverted = style({
  transform: 'rotate(180deg)',
})
