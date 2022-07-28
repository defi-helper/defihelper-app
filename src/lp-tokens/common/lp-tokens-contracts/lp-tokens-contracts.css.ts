import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

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

export const empty = style({
  display: 'flex',
  minHeight: 56,
  alignItems: 'center',
  width: '100%',
  maxWidth: 540,
  margin: '0 auto',
  flexDirection: 'column',
  gap: 8,
  padding: 24,
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
  flexDirection: 'column',
  gap: 8,
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

export const apyButton = style({
  verticalAlign: 'middle',
  marginLeft: 10,
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
