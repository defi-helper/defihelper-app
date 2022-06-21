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

export const content = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  columnGap: 24,
  rowGap: 12,
  marginBottom: 24,
})

export const chart = style({
  padding: '8px 16px',
  gridColumnStart: 1,
  gridColumnEnd: 3,
})

export const chartHeader = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 6,
  gap: 70,
})

export const chartMetric = style({})

export const chartTitle = style({
  color: theme.colors.textColorGrey,
  fontSize: 12,
  lineHeight: '16px',
})

export const chartInner = style({
  width: '100%',
  height: 570,
})
