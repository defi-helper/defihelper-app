import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const title = style({
  marginBottom: 32,
})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 16,
  marginBottom: 32,
})

globalStyle(`${row} > *:first-child`, {
  color: theme.colors.textColorGrey,
})

export const pool = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
})

export const poolRight = style([
  pool,
  {
    justifyContent: 'flex-end',
  },
])

export const inputs = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  marginBottom: 56,
})

export const input = style({})

globalStyle(`${input} * input, ${input} > div > div, ${input} svg`, {
  background: theme.colors.background,
})

export const stakeActions = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

export const mt = style({
  marginTop: 'auto',

  '@media': {
    [theme.mediaQueries.sm()]: {
      marginTop: 0,
    },
  },
})
