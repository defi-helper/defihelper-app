import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const flex = style({
  display: 'flex',
  alignItems: 'center',
})

export const root = style({
  gap: 14,
  display: 'grid',
  alignItems: 'center',
  padding: '22px 12px',
  gridTemplateColumns: '1fr 1fr',

  '@media': {
    [theme.mediaQueries.sm()]: {
      gap: 24,
      gridTemplateColumns: '30% 1fr 1fr',
      padding: '44px 32px',
    },
  },
})

export const title = style([
  flex,
  {
    gap: 8,
    gridColumnStart: 1,
    gridColumnEnd: 3,

    '@media': {
      [theme.mediaQueries.sm()]: {
        gridColumnStart: 'unset',
        gridColumnEnd: 'unset',
      },
    },
  },
])

export const button = style({
  marginLeft: 'auto',
  width: 110,
})

export const account = style({
  color: theme.colors.textColorGrey,
})
