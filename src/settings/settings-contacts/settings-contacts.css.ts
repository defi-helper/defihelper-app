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
