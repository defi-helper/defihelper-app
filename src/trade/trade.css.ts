import { globalStyle, style } from '@vanilla-extract/css'

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
    [theme.mediaQueries.md()]: {
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
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: '1fr 1fr 1fr',
      columnGap: 24,
      rowGap: 12,
      maxHeight: 731,
    },
  },
})

export const chart = style({
  padding: '10px 8px',

  '@media': {
    [theme.mediaQueries.md()]: {
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
      gap: 30,
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
  height: 653,

  vars: {
    '--tv-color-platform-background': 'black',
    '--tv-color-pane-background': 'black',
  },
})

export const selects = style({
  padding: '10px 6px',
  position: 'relative',
})

export const selectsBody = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
})

export const selectsBodyBlur = style({
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

export const switchNetwork = style({
  width: 'calc(100% - 32px)',
})

export const betaTitle = style({
  maxWidth: 275,
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
  marginBottom: 26,
  padding: '0 10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
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
  overflow: 'hidden',
  position: 'relative',
  zIndex: 1,

  ':before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 0,
    zIndex: -1,
  },
})

globalStyle(`${tabItem}:first-child:before`, {
  background: theme.colors.common.green2,
})

globalStyle(`${tabItem}:last-child:before`, {
  background: theme.colors.common.red1,
})

export const tabItemActive = style({
  ':before': {
    opacity: 1,
  },
})

export const pairIcon = style({
  minWidth: 24,
  height: 24,
  verticalAlign: 'middle',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  selectors: {
    '&:not(:first-child)': {
      marginLeft: -4,
    },

    '&:last-child': {
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
  color: 'currentColor',
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
  display: 'inline-flex',
  width: 44,
  alignItems: 'center',
  verticalAlign: 'middle',
  marginRight: 8,
})

export const transactionSettings = style({
  width: 208,
})

export const transactionSettingsTitle = style({
  marginBottom: 16,
})

export const transactionSettingsRowTitle = style({
  marginBottom: 9,
  color: theme.colors.textColorGrey,
})

export const transactionSettingsRow = style({
  display: 'grid',
  gridTemplateColumns: '100px 1fr',
  alignItems: 'flex-end',
  gap: 8,

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 8,
    },
  },
})

export const transactionSettingsButton = style({
  borderRadius: 6,
  height: 32,
  border: `1px solid ${theme.colors.border}`,
  justifyContent: 'center',
})

export const pairIconUnknown = style([
  pairIcon,
  {
    borderRadius: '50%',
    background: theme.colors.tertiary,
  },
])
