import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const list = style({
  padding: 0,
  margin: 0,
  listStyle: 'none',
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 24,
})

export const title = style({})

export const hide = style({
  display: 'none',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'block',
    },
  },
})

export const ml = style({
  marginLeft: 'auto',
})

export const checkbox = style([
  ml,
  {
    display: 'flex',
    alignItems: 'center',
  },
])

export const checkboxLabel = style({
  marginLeft: 5,
})

export const tabs = style([hide, ml])

export const select = style([
  hide,
  {
    marginLeft: 10,
    padding: '8px 16px',
    fontSize: 16,
    lineHeight: '24px',
    color: theme.colors.textColorGrey,
  },
])

export const selectArrow = style({
  width: 8,
  height: 4,
  marginLeft: 8,
  verticalAlign: 'middle',
  marginTop: '-4px',
  transform: 'rotate(180deg)',
})

export const search = style({
  width: 211,
  marginLeft: 'auto',
})

export const create = style({
  padding: 2,
  marginLeft: 24,

  '@media': {
    [theme.mediaQueries.down(959)]: {
      borderRadius: 6,
    },

    [theme.mediaQueries.md()]: {
      padding: 8,
    },
  },
})

export const createIcon = style({
  width: 12,
  height: 12,

  '@media': {
    [theme.mediaQueries.md()]: {
      width: 24,
      height: 24,
    },
  },
})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 5%',
  padding: '16px 24px',
  alignItems: 'center',
})

export const tableHeader = style({
  color: theme.colors.textColorGrey,
  borderBottom: `1px solid ${theme.colors.border}`,
})

export const listItem = style({
  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.colors.border}`,
    },
  },
})

export const hiddenListItem = style({
  opacity: 0.3,
  filter: 'sepia(.8)',
})

export const empty = style({
  padding: 16,
})

export const table = style({
  overflowX: 'auto',
  overflowY: 'hidden',
})

export const tableInner = style({
  minWidth: 900,

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 10,
    },
  },
})

export const tableCol = style({
  display: 'flex',
  alignItems: 'center',
})

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
