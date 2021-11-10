import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const title = style({
  marginBottom: 24,
})

export const charts = style({
  display: 'grid',
  gap: 16,
  marginBottom: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: '1fr 1fr',
      gap: 24,
      marginBottom: 24,
    },
  },
})

export const total = style({
  display: 'grid',
  gap: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 24,
    },
  },
})

export const totalTitle = style({
  color: theme.colors.textColorGrey,
  marginBottom: 4,
})

export const totalItem = style({
  padding: '24px 32px 32px',
})
