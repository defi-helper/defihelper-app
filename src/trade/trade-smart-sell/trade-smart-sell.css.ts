import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const form = style({
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
})

export const flex = style({
  display: 'flex',
  flexDirection: 'column',
})

export const root = style([
  flex,
  {
    gap: 24,
    maxHeight: 420,
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '0 10px',
  },
])

export const overflow = style({
  overflow: 'hidden',
})

export const inputGroup = style([
  flex,
  {
    gap: 8,
  },
])

export const currentPrice = style({
  color: theme.colors.textColorGrey,
  fontSize: 12,
})

export const currentPriceButton = style({
  color: theme.colors.common.blue1,
})

export const trailingBuy = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 8,
})

export const trailingBuyInput = style({
  width: 100,
})

export const trailingBuyTitle = style({
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  width: '100%',
})

export const trailingBuyLabel = style({
  display: 'flex',
  alignItems: 'center',
  color: theme.colors.textColorGrey,
  gap: 4,
})

export const takeProfitLabel = style([
  trailingBuyLabel,
  {
    color: theme.colors.textColorPrimary,
  },
])

export const slider = style({
  maxWidth: 'calc(100% - 108px)',
})

export const buttons = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  padding: '12px 10px 0 10px',
  gap: 8,
  marginTop: 'auto',
})

export const fullWidth = style({
  gridColumnStart: 1,
  gridColumnEnd: 3,
})

export const approveTransactions = style([
  fullWidth,
  {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    color: theme.colors.textColorGrey,
  },
])

export const balance = style({
  marginLeft: 'auto',
})

export const balanceButton = style({
  color: theme.colors.common.blue1,
})
