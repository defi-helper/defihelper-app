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

export const create = style({
  padding: 2,
  marginLeft: 'auto',

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
  gridTemplateColumns: '15% 14% 13% 13% 13% 13% 1fr',
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

export const card = style({
  cursor: 'pointer',

  '@media': {
    [theme.mediaQueries.hover()]: {
      ':hover': {
        opacity: 0.6,
      },
    },
  },
})

export const table = style({
  overflowX: 'auto',
  overflowY: 'hidden',
})

export const boostTooltipTHead = style({
  display: 'flex',
  gridGap: 5,
  justifyContent: 'flex-end',
})

export const tableInner = style({
  minWidth: 900,

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 10,
    },
  },
})

export const red = style({
  color: theme.colors.common.red1,
})

export const lightGreen = style({
  color: theme.colors.common.green1,
})

export const green = style({
  color: theme.colors.common.green2,
})

export const tableCol = style({
  display: 'flex',
  alignItems: 'center',
})

export const coinIcons = style({
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: 20,
  marginLeft: -10,
})

export const coinIcon = style({
  width: 24,
  height: 24,
})

export const accorionButton = style({
  color: theme.colors.textColorGrey,
  marginLeft: 'auto',
})

export const manageButton = style({
  width: 24,
  height: 24,
  padding: 6,
  marginLeft: 5,
})

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const autostakingCol = style({
  width: '60%',
})

export const negative = style({
  color: theme.colors.common.red1,
})

export const positive = style({
  color: theme.colors.textColorGreen,
})
