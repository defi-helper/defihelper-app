import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  position: 'fixed',
  top: 0,
  left: 0,
  minHeight: '100%',
  width: '100%',
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',

  '@media': {
    [theme.mediaQueries.md()]: {
      alignItems: 'center',
    },
  },
})

export const backdrop = style({
  background: theme.colors.common.black12,
  position: 'fixed',
  top: 0,
  left: 0,
  minHeight: '100%',
  width: '100%',
  zIndex: -1,
})

export const content = style({
  color: theme.colors.textColorPrimary,
  maxHeight: '70vh',
  overflowY: 'auto',
  overflowX: 'hidden',
  border: `1px solid ${theme.colors.border}`,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,

  '@media': {
    [theme.mediaQueries.md()]: {
      maxHeight: '100vh',
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
  },
})

export const closeButton = style({
  position: 'absolute',
  top: 0,
  right: 0,
})
