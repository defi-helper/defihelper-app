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

export const header = style({
  display: 'grid',
  gap: 8,
  marginBottom: 24,

  '@media': {
    [theme.mediaQueries.lg()]: {
      gridTemplateColumns: '1fr 1fr 1fr',
      columnGap: 24,
    },
  },
})

export const content = style({
  display: 'grid',
  gap: 24,
  marginBottom: 24,

  '@media': {
    [theme.mediaQueries.lg()]: {
      gridTemplateColumns: '1fr 1fr 1fr',
      columnGap: 24,
      rowGap: 12,
    },
  },
})

export const chart = style({
  padding: '10px 8px',

  '@media': {
    [theme.mediaQueries.lg()]: {
      padding: '8px 16px',
      gridColumnStart: 1,
      gridColumnEnd: 3,
    },
  },
})

export const chartHeader = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 6,
  gap: 17,

  '@media': {
    [theme.mediaQueries.md()]: {
      gap: 70,
    },
  },
})

export const chartMetric = style({
  '@media': {
    [theme.mediaQueries.down(956)]: {
      fontSize: 9,
      lineHeight: '16px',
    },
  },
})

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
  position: 'relative',
})

export const selectsBody = style({
  filter: 'blur(4px)',
  background: theme.colors.blur,
  pointerEvents: 'none',
})

export const beta = style({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 24,
})

export const betaTitle = style({
  maxWidth: 275,
})

export const betaForm = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
  maxWidth: 320,
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

export const pairIcon = style({
  width: 24,
  height: 24,
  verticalAlign: 'middle',

  selectors: {
    '&:not(:first-child)': {
      marginLeft: -4,
    },

    '&:last-of-type': {
      marginRight: 8,
    },
  },
})

export const connectWalletLabel = style({
  color: theme.colors.textColorGrey,
  marginBottom: 4,
})

export const connectWalletInput = style({
  display: 'flex',
  alignItems: 'center',
  width: 'inherit',
  height: 'inherit',
  outline: 'none',
  border: `1px solid ${theme.colors.border}`,
  textTransform: 'inherit',
  fontFamily: theme.fonts.square,
  backgroundColor: theme.colors.paper,
  borderRadius: 8,
  fontSize: 16,
  lineHeight: '24px',
  padding: '8px 16px',
  color: 'currentcolor',
  transition: 'border .2s ease-in-out',
  minHeight: 42,
  paddingRight: 40,
  position: 'relative',
  gap: 8,

  '@media': {
    [theme.mediaQueries.hover()]: {
      ':hover': {
        borderColor: theme.colors.textColorGrey,
      },
    },
  },

  ':focus': {
    borderColor: theme.colors.textColorPrimary,
  },
})

export const connectWalletArrow = style({
  position: 'absolute',
  right: 16,
  top: 0,
  bottom: 0,
  margin: 'auto',
  background: theme.colors.paper,
})

export const ticker = style({
  display: 'flex',
  gap: 8,
})

export const tickerIcons = style({
  display: 'flex',
  width: 44,
  alignItems: 'center',
})
