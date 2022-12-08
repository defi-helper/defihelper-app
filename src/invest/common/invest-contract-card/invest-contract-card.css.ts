import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const row = style({
  padding: '24px 24px 16px',
  display: 'flex',
  flexDirection: 'column',

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 8,
    },
  },

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'grid',
      gap: 30,
      alignItems: 'center',
      padding: '20px 16px',
      gridTemplateColumns: '13% 13% 9% 9% 9% 9% 4% 10%',

      selectors: {
        '&:not(:last-child)': {
          borderBottom: `1px solid ${theme.colors.border}`,
        },
      },
    },

    [theme.mediaQueries.lg()]: {
      gridTemplateColumns: '13% 12% 9% 8% 15% 12% 5% 7%',
    },
  },
})

export const mobileRow = style({
  '@media': {
    [theme.mediaQueries.down(959)]: {
      margin: '0 27px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      marginBottom: 12,
    },
  },
})

export const apyBoost = style([
  mobileRow,
  {
    display: 'flex',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
])

export const contractCardName = style({
  display: 'flex',
  gap: 8,
  marginBottom: 2,
  flexDirection: 'column',

  '@media': {
    [theme.mediaQueries.down(959)]: {
      fontSize: 16,
      lineHeight: '24px',
      alignItems: 'center',
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
  justifyContent: 'center',
  gap: 8,
  transition: 'color .2s ease-in-out',

  '@media': {
    [theme.mediaQueries.md()]: {
      justifyContent: 'flex-start',
    },

    [theme.mediaQueries.hover()]: {
      ':hover': {
        color: theme.colors.common.blue1,
      },
    },
  },
})

export const contractProtocolInner = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,

  '@media': {
    [theme.mediaQueries.down(959)]: {
      marginBottom: 2,
    },
  },
})

export const contractProtocolLinkIcon = style({
  display: 'none',
})

globalStyle(`${contractProtocol}:hover ${contractProtocolLinkIcon}`, {
  '@media': {
    [theme.mediaQueries.hover()]: {
      display: 'block',
    },
  },
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
  marginTop: 12,

  '@media': {
    [theme.mediaQueries.md()]: {
      marginLeft: 'auto',
      marginTop: 0,
    },
  },
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

export const networkDropdown = style({
  maxWidth: 276,
})

export const mobileRisk = style({
  marginBottom: 16,
})

export const mobileTokenIcons = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 4,
})

export const mobileTokenIconsItem = style({
  width: 51,
  height: 51,
  borderRadius: '50%',

  selectors: {
    '&:not(:first-child)': {
      marginLeft: -5,
    },
  },
})

export const mobileTokenIconsItemUnknown = style([
  mobileTokenIconsItem,
  {
    background: theme.colors.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
])

export const mobileNetwork = style({
  marginBottom: -16,
})
