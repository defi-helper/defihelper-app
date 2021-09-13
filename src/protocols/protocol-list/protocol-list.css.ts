import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const header = style({
  marginBottom: 28,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const protocols = style({
  padding: 0,
  margin: 0,
  listStyle: 'none',
})

export const link = style({
  textDecoration: 'none',
  color: 'currentcolor',
  display: 'flex',
  padding: '16px 0',
  alignItems: 'center',
})

export const logo = style({
  marginRight: 8,
})

export const proposalsHeader = style({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: '1fr 21% 16% 15% 18% 21%',
  opacity: 0.4,
  marginBottom: 8,
})

export const name = style({
  gridColumnStart: 2,
})

export const item = style({
  width: '100%',

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 8,
    },
  },
})

export const card = style({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: '1fr 21% 16% 15% 18% 21%',
})

export const favorite = style({
  width: 20,
  height: 20,
  opacity: 0.24,
  padding: 2,
  marginLeft: 18,
  transition: 'opacity .1s ease-in-out, color .1s ease-in-out',
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
  display: 'flex',
  alignItems: 'center',
  color: theme.colors.common.green2,
})

export const manage = style({
  width: 20,
  height: 20,
  color: theme.colors.textColorPrimary,
  margin: '0 auto',
})

export const manageDropdown = style({
  display: 'flex',
  flexDirection: 'column',
  padding: 10,
})

export const manageDropdownItem = style({
  justifyContent: 'flex-start',
})
