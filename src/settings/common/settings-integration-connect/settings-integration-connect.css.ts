import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  padding: '6px 12px 18px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'center',
  gap: 14,

  '@media': {
    [theme.mediaQueries.sm()]: {
      gap: 24,
      gridTemplateColumns: '30% 1fr 1fr',
      padding: '16px 32px 28px',
    },
  },
})

export const text = style({
  gridColumnStart: 1,
  gridColumnEnd: 3,
})

export const title = style({
  marginBottom: 20,
})

export const button = style({
  marginLeft: 'auto',
  width: 110,
  gridColumnStart: 2,

  '@media': {
    [theme.mediaQueries.sm()]: {
      gridColumnStart: 'unset',
    },
  },
})

export const form = style({
  gridColumnStart: 1,
  gridColumnEnd: 3,
  overflow: 'hidden',

  '@media': {
    [theme.mediaQueries.sm()]: {
      gridColumnStart: 1,
      gridColumnEnd: 4,
    },
  },
})

export const select = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 12,
    },
  },
})
