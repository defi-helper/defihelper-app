import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const header = style({
  display: 'none',
  alignItems: 'center',
  marginBottom: 32,
  gap: 24,

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'flex',
    },
  },
})

export const subtitle = style({
  marginBottom: 24,
})

export const searchButton = style({
  backgroundColor: theme.colors.paper,
  padding: 4,
  borderRadius: 6,
})

export const action = style({
  display: 'flex',
  gap: 8,
})

export const createMobile = style({
  width: 24,
  height: 24,
  padding: 6,
  borderRadius: 6,
})

export const addButton = style({
  marginLeft: 'auto',
})

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const inputs = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 28,
  gap: 24,
})

export const input = style({
  maxWidth: 200,
  width: '100%',
})

export const select = input

globalStyle(`${select} > div > div, ${select} > div > div > svg`, {
  background: theme.colors.background,
})

export const search = style([
  input,
  {
    display: 'none',

    '@media': {
      [theme.mediaQueries.md()]: {
        display: 'block',
      },
    },
  },
])

export const mobileTabs = style({
  display: 'flex',
  alignItems: 'center',
  gap: 14,
})

export const inacitveTab = style({
  color: theme.colors.textColorGrey,
  opacity: 0.5,
  transition: 'color .3s ease-in-out, opacity .3s ease-in-out',

  '@media': {
    [theme.mediaQueries.hover()]: {
      ':hover': {
        opacity: 1,
        color: theme.colors.textColorPrimary,
      },
    },
  },
})

export const pagination = style({
  marginTop: 10,
})
