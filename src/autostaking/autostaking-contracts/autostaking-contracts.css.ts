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
      gridTemplateColumns: '296px 296px 1fr',
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
    gridTemplateColumns: '1fr 1fr 10% 12% 14% 19%',

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
  alignItems: 'center',
  marginBottom: 8,

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

export const contractCardButtonIcon = style({
  selectors: {
    '&:not(:first-child)': {
      marginLeft: -4,
    },
  },
})

export const contractCardIcon = style({
  width: 20,
  height: 20,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const contractNetworkIcon = style({
  marginRight: 16,
})

export const contractUnknownNetworkIcon = style([
  contractNetworkIcon,
  {
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
])

export const contractTokenInfo = style({
  maxWidth: 276,
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '24px 1fr',
  gap: 8,
})

export const contractTokenInfoClose = style({
  position: 'absolute',
  right: 0,
  top: 0,
})

globalStyle(`${contractTokenInfoClose} + div`, {
  background: theme.colors.secondary,
})

export const contractCardLink = style({
  alignItems: 'center',
  verticalAlign: 'middle',
})

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
