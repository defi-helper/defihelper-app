import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  padding: '16px 0',

  '@media': {
    [theme.mediaQueries.lg()]: {
      padding: '48px 0',
    },
  },
})

export const logo = style({
  display: 'none',

  '@media': {
    [theme.mediaQueries.lg()]: {
      display: 'block',
      width: 276,
      height: 24,
    },
  },
})

export const logoMini = style({
  display: 'block',

  '@media': {
    [theme.mediaQueries.lg()]: {
      display: 'none',
    },
  },
})

export const padding = style({
  padding: '0 16px',
})

export const actions = style({
  marginLeft: 'auto',
})
