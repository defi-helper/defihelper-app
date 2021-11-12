import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const card = style({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: '1fr 1fr',
  padding: '9px 9px 12px',

  '@media': {
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: '1fr 21% 16% 15% 18% 21%',
      padding: 0,
    },
  },
})

export const favorite = style({
  width: 20,
  height: 20,
  opacity: 0.24,
  padding: 2,
  transition: 'opacity .1s ease-in-out, color .1s ease-in-out',
  gridColumnStart: 2,
  marginLeft: 'auto',

  '@media': {
    [theme.mediaQueries.md()]: {
      gridColumnStart: 'unset',
      marginLeft: 18,
    },
  },
})

export const link = style({
  textDecoration: 'none',
  color: 'currentcolor',
  display: 'flex',
  alignItems: 'center',
  gridColumnStart: 1,
  gridRowStart: 1,

  '@media': {
    [theme.mediaQueries.md()]: {
      gridColumnStart: 'unset',
      gridRowStart: 'unset',
      padding: '16px 0',
    },
  },
})

export const logo = style({
  marginRight: 8,
})

export const label = style({
  gridColumnStart: 1,
  color: theme.colors.textColorGrey,

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'none',
    },
  },
})

export const value = style({
  gridColumnStart: 2,

  '@media': {
    [theme.mediaQueries.md()]: {
      gridColumnStart: 'unset',
    },
  },
})

export const favoriteActive = style({
  color: theme.colors.common.yellow,
  opacity: 1,
})

globalStyle(`${favorite}:not(${favoriteActive}):hover`, {
  '@media': {
    [theme.mediaQueries.hover()]: {
      color: theme.colors.common.yellow,
      opacity: 0.5,
    },
  },
})

export const profit = style({
  display: 'none',
  alignItems: 'center',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'flex',
    },
  },
})

export const manage = style({
  width: 20,
  height: 20,
  color: theme.colors.textColorPrimary,
  marginLeft: 'auto',
  marginRight: 10,
})

export const manageDropdown = style({
  display: 'flex',
  flexDirection: 'column',
  padding: 10,
})

export const manageDropdownItem = style({
  justifyContent: 'flex-start',
})
