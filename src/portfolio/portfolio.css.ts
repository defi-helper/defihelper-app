import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const title = style({
  marginBottom: 28,
  display: 'none',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'block',
    },
  },
})

export const generatingTitle = style({
  marginBottom: 8,

  '@media': {
    [theme.mediaQueries.lg()]: {
      fontSize: 48,
    },
  },
})

export const generatingDescription = style({
  color: theme.colors.textColorGrey,
  maxWidth: 728,
  marginBottom: 48,
})

export const cards = style({
  marginBottom: 24,
})

export const grid = style({
  display: 'grid',
  gap: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      gap: 24,
      gridTemplateColumns: '1fr 1fr',
    },
  },
})

export const mainChart = style({
  '@media': {
    [theme.mediaQueries.md()]: {
      gridColumnStart: 1,
      gridColumnEnd: 3,
    },
  },
})

export const section = style({
  marginBottom: 64,
})

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
