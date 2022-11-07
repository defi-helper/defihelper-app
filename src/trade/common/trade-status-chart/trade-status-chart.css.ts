import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  position: 'relative',
  maxWidth: 286,
})

export const rail = style({
  backgroundColor: theme.colors.border,
  height: 6,
  width: '100%',
  borderRadius: 1,
  position: 'relative',
})

export const track = style({
  height: 6,
  width: '100%',
  borderRadius: 1,
  position: 'absolute',
  zIndex: -1,
})

export const normalColor = style({
  backgroundColor: theme.colors.common.green2,
})

export const reverseColor = style({
  backgroundColor: theme.colors.common.red1,
})

export const fs12 = style({
  fontSize: 12,
  lineHeight: '12px',
})

export const grey = style({
  color: theme.colors.textColorGrey,
})

export const posa = style({
  position: 'absolute',
  bottom: 0,
  display: 'flex',
  gap: 5,
})

export const stopLossLine = style({
  position: 'absolute',
  left: 0,
  top: 0,
  background: theme.colors.common.red1,
  width: 1,
  height: 40,
})

export const stopLoss = style([
  fs12,
  posa,
  {
    left: 4,
  },
])

export const stopLossTitle = style({
  color: theme.colors.common.red1,
})

export const takeProfitLine = style({
  position: 'absolute',
  right: 0,
  top: 0,
  background: theme.colors.common.green2,
  width: 1,
  height: 40,
})

export const takeProfit = style([
  fs12,
  posa,
  {
    right: 4,
  },
])

export const takeProfitTitle = style({
  color: theme.colors.common.green2,
})

export const buyLine = style({
  position: 'absolute',
  top: 0,
  background: theme.colors.textColorPrimary,
  width: 1,
  height: 24,
})

export const buy = style([
  fs12,
  posa,
  grey,
  {
    whiteSpace: 'nowrap',
  },
])

export const buyTitle = style([fs12, {}])

export const profitLine = style({
  position: 'absolute',
  bottom: 0,
  width: 1,
  height: 22,
})

export const profit = style([
  fs12,
  posa,
  grey,
  {
    whiteSpace: 'nowrap',
    top: 0,
  },
])

export const profitTitle = style([fs12, {}])
