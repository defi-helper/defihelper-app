import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const header = style({
  marginBottom: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      marginBottom: 24,
    },
  },
})

export const list = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(351px, 1fr))',
  gridGap: 24,
  minHeight: 168,
})

export const carousel = style({
  marginLeft: -16,
  marginRight: -16,
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
