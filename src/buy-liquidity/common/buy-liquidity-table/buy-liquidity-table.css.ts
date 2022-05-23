import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '201px 1fr',

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 8,
    },
  },
})

export const header = style([
  row,
  {
    color: theme.colors.textColorGrey,
    display: 'none',
    padding: '8px 48px',

    '@media': {
      [theme.mediaQueries.md()]: {
        display: 'grid',
      },
    },
  },
])

export const list = style({
  padding: 0,
  margin: 0,
  listStyle: 'none',
})

export const listItem = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 16,
    },
  },
})

export const listItemLoader = style([
  listItem,
  {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    width: '100%',
  },
])

export const empty = style({
  display: 'flex',
  padding: '9px 9px 9px 18px',
  minHeight: 56,
  alignItems: 'center',
  width: '100%',
})

export const emptyContracts = style({
  background: theme.colors.secondary,
})

export const protocolCard = style([
  row,
  {
    padding: 24,
    position: 'relative',
    display: 'block',
    cursor: 'pointer',

    '@media': {
      [theme.mediaQueries.md()]: {
        display: 'grid',
        padding: '16px 48px',
      },
    },
  },
])

export const protocolCardImage = style({
  borderRadius: '50%',
  width: 28,
  height: 28,

  '@media': {
    [theme.mediaQueries.md()]: {
      width: 24,
      height: 24,
    },
  },
})

export const protocolCardName = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginBottom: 16,

  '@media': {
    [theme.mediaQueries.down(959)]: {
      fontSize: 20,
      lineHeight: '28px',
    },

    [theme.mediaQueries.md()]: {
      marginBottom: 0,
    },
  },
})

export const protocolCardTvl = style({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: '96px 1fr',
  gap: 40,

  '@media': {
    [theme.mediaQueries.down(959)]: {
      fontSize: 16,
      lineHeight: '24px',
    },

    [theme.mediaQueries.md()]: {
      display: 'block',
    },
  },
})

export const grey = style({
  color: theme.colors.textColorGrey,
  display: 'block',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'none',
    },
  },
})

export const protocolCardArrow = style({
  position: 'absolute',
  top: 24,
  right: 12,

  '@media': {
    [theme.mediaQueries.md()]: {
      bottom: 0,
      top: 0,
      right: 16,
      margin: 'auto',
    },
  },
})

export const contracts = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  borderRadius: 8,

  '@media': {
    [theme.mediaQueries.md()]: {
      gap: 0,
      background: theme.colors.secondary,
    },
  },
})

export const contractRow = style({
  gridTemplateColumns: '1fr 15% 15% 1fr 15%',
  alignItems: 'center',
  gap: 10,
})

export const contractHeader = style([
  contractRow,
  {
    color: theme.colors.textColorGrey,
    padding: '16px 50px 13px',
    display: 'none',

    '@media': {
      [theme.mediaQueries.md()]: {
        display: 'grid',
      },
    },
  },
])

export const contractCard = style([
  contractRow,
  {
    background: theme.colors.secondary,
    padding: 24,

    '@media': {
      [theme.mediaQueries.md()]: {
        display: 'grid',
        padding: '18px 42px',
      },
    },
  },
])

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

export const contractCardTextRow = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 16,
  marginBottom: 8,
  alignItems: 'center',
  verticalAlign: 'middle',

  '@media': {
    [theme.mediaQueries.down(959)]: {
      fontSize: 16,
      lineHeight: '24px',
    },

    [theme.mediaQueries.md()]: {
      marginBottom: 0,
      display: 'block',
    },
  },
})

export const contractCardLink = style({
  alignItems: 'center',
  verticalAlign: 'middle',
})

export const contractButtonWrap = style({
  marginTop: 32,

  '@media': {
    [theme.mediaQueries.md()]: {
      marginTop: 0,
    },
  },
})

export const contractButton = style({
  width: '100%',

  '@media': {
    [theme.mediaQueries.md()]: {
      width: 'auto',
    },
  },
})

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

export const apyButton = style({
  verticalAlign: 'middle',
  marginLeft: 10,
})
