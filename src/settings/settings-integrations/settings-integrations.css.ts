import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const header = style({
  marginBottom: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      marginBottom: 32,
    },
  },
})

export const list = style({
  display: 'grid',
  gap: 24,

  '@media': {
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(calc(50% - 24px), 1fr))',
    },
  },
})

export const addButton = style({
  '@media': {
    [theme.mediaQueries.down(959)]: {
      padding: 6,
      width: 24,
      height: 24,
    },
  },
})

export const addButtonTitle = style({
  display: 'none',
  marginLeft: 11,

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'inline',
    },
  },
})

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 140,
})
