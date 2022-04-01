import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  padding: 16,
  minHeight: '100%',

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '24px 32px',
    },
  },
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 32,
})
