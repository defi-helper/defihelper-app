import { style, styleVariants } from '@vanilla-extract/css'
import { theme } from '../theme'

export const root = style({
  backgroundColor: theme.colors.paper,
  textDecoration: 'none',
})

export const radius = styleVariants({
  8: {
    borderRadius: 8,
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
