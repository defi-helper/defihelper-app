import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 16,
})

globalStyle(`${row} > *:first-child`, {
  color: theme.colors.textColorGrey,
})

export const rewardTokens = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})

export const protocol = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})

export const positive = style({
  color: theme.colors.textColorGreen,
})

export const negative = style({
  color: theme.colors.common.red1,
})

export const risk = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})

export const apyboostQuestion = style({
  color: theme.colors.textColorGrey,
  verticalAlign: 'middle',
})

export const dropdown = style({
  width: 252,
})

export const autostakingTooltipTitle = style({
  color: theme.colors.textColorGreen,
  marginBottom: 8,
})

export const autostakingTooltipText = style({
  marginBottom: 16,
})
