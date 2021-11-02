import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  width: '100%',

  '@media': {
    [theme.mediaQueries.md()]: {
      width: 'calc(100% - 240px)',
    },
  },
})

export const content = style({
  maxWidth: 1136,
  width: '100%',
  margin: '0 auto',
  padding: '0 16px 16px',

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '28px 16px',
    },
  },
})
