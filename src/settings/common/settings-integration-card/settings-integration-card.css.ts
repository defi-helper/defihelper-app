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
      gridTemplateColumns: '1fr min-content',
      padding: '44px 32px',
    },
  },
})

export const cardProperties = style({
  display: 'grid',
  gridTemplateColumns: 'min-content min-content',
  gridGap: 24,
})

export const cardProperty = style({
  color: theme.colors.textColorGrey,
  lineHeight: '24px',
})

export const question = style({
  verticalAlign: 'middle',
})

export const questionIcon = style({
  marginLeft: 8,
  color: theme.colors.textColorGrey,
})

export const integrationExpiredHintHeadline = style({
  color: theme.colors.common.red1,
  marginBottom: 8,
})

export const integrationExpiredHintBody = style({
  width: 222,
})

export const integrationExpiredHintBodyColorAccent = style({
  color: theme.colors.common.blue1,
})

export const accountStatusActive = style({
  color: theme.colors.common.green2,
})

export const accountStatusInactive = style({
  color: theme.colors.common.red1,
})

export const title = style([
  flex,
  {
    gap: 8,
    gridColumnStart: 1,
    gridColumnEnd: 3,
    marginBottom: 8,

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
