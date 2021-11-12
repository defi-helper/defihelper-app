import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  padding: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '24px 32px',
    },
  },
})

export const header = style({
  marginBottom: 36,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})
