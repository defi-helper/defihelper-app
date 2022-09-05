import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const header = style({
  marginBottom: 16,
})

export const title = style({
  marginBottom: 24,
})

export const selects = style({
  display: 'grid',
  gap: 8,
  marginBottom: 64,

  '@media': {
    [theme.mediaQueries.lg()]: {
      marginBottom: 32,
      gap: 16,
      gridTemplateColumns: '236px 236px 236px 1fr',
    },
  },
})

export const select = style({})

export const apply = style({
  justifyContent: 'center',
})

export const protocolIcon = style({
  borderRadius: '50%',
  width: 24,
  height: 24,
  marginRight: 8,
})

export const search = style({
  '@media': {
    [theme.mediaQueries.lg()]: {
      marginLeft: 'auto',
      maxWidth: 211,
    },
  },
})

globalStyle(`${search} input`, {
  backgroundColor: theme.colors.paper,
})

export const tableWrap = style({
  maxWidth: '100%',
  overflowX: 'auto',
})

export const table = style({
  background: theme.colors.paper,
  minWidth: 1000,
})

export const padding = style({
  padding: '20px 16px',
})

export const row = style([
  padding,
  {
    alignItems: 'center',
    gap: 30,
    display: 'grid',
    gridTemplateColumns: '13% 12% 9% 8% 15% 12% 5% 7%',

    selectors: {
      '&:not(:last-child)': {
        borderBottom: `1px solid ${theme.colors.border}`,
      },
    },
  },
])

export const tableHeader = style([
  row,
  {
    padding: 16,
    color: theme.colors.textColorGrey,
  },
])

export const tableName = style({
  paddingLeft: 28,
})

export const apyBoost = style({
  display: 'flex',
  gap: 16,
  alignItems: 'center',
})

export const contractCardName = style({
  display: 'flex',
  gap: 8,
  marginBottom: 8,
  flexDirection: 'column',

  '@media': {
    [theme.mediaQueries.down(959)]: {
      fontSize: 16,
      lineHeight: '24px',
    },

    [theme.mediaQueries.md()]: {
      marginBottom: 0,
    },
  },
})

export const contractCardIcons = style({
  display: 'flex',
  alignItems: 'center',
})

export const contractNetworkIcon = style({
  marginRight: 16,
})

export const contractIconBg = style({
  background: theme.colors.background,
})

export const contractUnknownNetworkIcon = style([
  contractNetworkIcon,
  contractIconBg,
  {
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
])

export const contractProtocol = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})

export const contractProtocolIcon = style({
  width: 24,
  height: 24,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const autostakeButton = style({
  marginLeft: 'auto',
})

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto',
  width: '100%',
})

export const apyButton = style({
  verticalAlign: 'middle',
  marginLeft: 10,
})

export const positive = style({
  color: theme.colors.textColorGreen,
})

export const negative = style({
  color: theme.colors.common.red1,
})

export const apyboostQuestion = style({
  color: theme.colors.textColorGrey,
  verticalAlign: 'middle',
})

export const dropdown = style({
  width: 252,
})

export const riskLevel = style({
  minWidth: 206,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
})

export const riskLevelRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
})

export const riskLevelSpacing = style({
  background: theme.colors.border,
  height: 1,
  width: '100%',
})

export const riskLevelStatus = style({
  background: theme.colors.common.green2,
  padding: '0 31px',
  borderRadius: 22,
  color: theme.colors.secondary,
})
