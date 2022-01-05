import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const title = style({
  marginBottom: 32,
})

export const list = style({
  display: 'grid',
  gap: 24,
  minHeight: 314,
  gridTemplateColumns: 'repeat(auto-fill, minmax(277px, 1fr))',

  '@media': {
    [theme.mediaQueries.sm()]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(351px, 1fr))',
    },
  },
})
