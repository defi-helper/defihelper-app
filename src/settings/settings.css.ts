import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const section = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 45,

      '@media': {
        [theme.mediaQueries.md()]: {
          marginBottom: 72,
        },
      },
    },
  },
})

export const title = style({
  marginBottom: 32,
})
