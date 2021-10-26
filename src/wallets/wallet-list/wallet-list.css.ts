import { style, globalStyle } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  width: 360,
  padding: '24px 16px',
})

export const icon = style({
  width: 20,
  height: 20,
  color: theme.colors.textColorPrimary,
  marginRight: 8,
})

export const list = style({
  padding: 0,
  margin: 0,
  listStyle: 'none',
})

export const wallet = style({
  padding: '8px 16px',
  width: '100%',
  justifyContent: 'flex-start',
  position: 'relative',
  zIndex: 0,

  ':after': {
    position: 'absolute',
    content: '""',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    background: theme.colors.textColorPrimary,
    borderRadius: 8,
    opacity: 0,
    transition: 'opacity .2s ease-in-out',
  },
})

globalStyle(`${wallet}:hover:after`, {
  '@media': {
    [theme.mediaQueries.hover()]: {
      opacity: 0.08,
    },
  },
})
