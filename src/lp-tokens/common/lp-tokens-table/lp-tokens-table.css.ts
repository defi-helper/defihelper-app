import { style } from '@vanilla-extract/css'

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

export const protocolCard = style([
  row,
  {
    padding: 24,
    position: 'relative',
    display: 'block',
    cursor: 'pointer',
    zIndex: 10,

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
