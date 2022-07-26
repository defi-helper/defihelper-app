import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const flex = style({
  display: 'flex',
  flexDirection: 'column',
})

export const root = style([
  flex,
  {
    gap: 24,
    maxHeight: 370,
    overflowY: 'hidden',
    overflowX: 'hidden',
    padding: '0 10px',
  },
])

export const inputGroup = style([
  flex,
  {
    gap: 8,
  },
])

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
