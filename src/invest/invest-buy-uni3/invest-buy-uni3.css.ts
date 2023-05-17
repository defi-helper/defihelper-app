import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const title = style({
  marginBottom: 4,
})

export const subtitle = style({
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

export const img = style({
  width: 24,
  height: 24,
  marginRight: 5,
  verticalAlign: 'middle',
})

export const imgPlaceHolder = style([
  img,
  {
    background: theme.colors.border,
    borderRadius: '50%',
  },
])

export const balance = style({
  color: theme.colors.common.blue1,
  marginLeft: 'auto',
})

export const tokenBalance = style([
  balance,
  {
    color: theme.colors.textColorGrey,
  },
])

export const error = style({
  background: theme.colors.common.red1,
  color: theme.colors.common.white1,
  borderRadius: 8,
  padding: 8,
  marginBottom: 10,
})

export const justifyContentStart = style({
  justifyContent: 'flex-start',
  textAlign: 'left',
})

export const depositSelect = style({
  marginBottom: 48,
})

export const tokenIcon = style({
  width: 24,
  height: 24,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',

  selectors: {
    '&:not(:last-child)': {
      marginRight: -4,
    },
  },
})

export const interval = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const intervalBetween = style({
  marginTop: 20,
})
