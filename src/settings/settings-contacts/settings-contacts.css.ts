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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
})
