import { style, styleVariants } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  backgroundColor: theme.colors.paper,
  textDecoration: 'none',
})

export const radius = styleVariants({
  4: {
    borderRadius: 4,
  },

  6: {
    borderRadius: 6,
  },

  8: {
    borderRadius: 8,
  },

  12: {
    borderRadius: 12,
  },

  24: {
    borderRadius: 16,

    '@media': {
      [theme.mediaQueries.lg()]: {
        borderRadius: 24,
      },
    },
  },
})
