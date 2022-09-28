import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const header = style({
  display: 'none',
  alignItems: 'center',
  marginBottom: 40,

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'flex',
    },
  },
})
