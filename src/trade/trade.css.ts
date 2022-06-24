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

export const selects = style({
  padding: '10px 6px',
})

export const tradeSellSelect = style({
  backgroundColor: theme.colors.common.green1,
  padding: '8px 16px',
  justifyContent: 'space-between',
  borderRadius: 8,
  width: 160,
  color: theme.colors.common.black1,
})

export const tradeSelectHeader = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  marginBottom: 26,
  padding: '0 10px',
})

export const tabs = style({
  border: `1px solid ${theme.colors.border}`,
  padding: 2,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 4,
  borderRadius: 8,
  margin: '0 10px 8px 10px',
})

export const tabItem = style({
  borderRadius: 6,
  padding: 6,
})

export const tabBuy = style({
  background: theme.colors.common.green2,
})

export const tabSell = style({
  background: theme.colors.common.red1,
})

export const currentBalance = style({
  fontSize: 12,
  lineHeight: '14px',
})

export const currentBalanceValue = style({
  color: theme.colors.common.blue1,
})

export const buttons = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  padding: '12px 10px 0 10px',
  gap: 8,
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
