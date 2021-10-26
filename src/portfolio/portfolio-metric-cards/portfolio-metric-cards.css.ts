import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  display: 'grid',
  gap: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 24,
    },
  },
})
