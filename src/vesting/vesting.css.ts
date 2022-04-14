import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  maxWidth: 400,
  padding: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '32px 32px 24px',
    },
  },
})

export const title = style({
  marginBottom: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      marginBottom: 32,
    },
  },
})

export const label = style({
  color: theme.colors.textColorGrey,
  marginBottom: 4,
})

export const row = style({
  marginBottom: 16,
})
