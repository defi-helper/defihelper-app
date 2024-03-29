import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  padding: '14px 18px 13px 16px',
  flexWrap: 'wrap',
  zIndex: 10,

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '12px 24px 12px 16px',
      flexWrap: 'nowrap',
    },
  },
})

export const body = style({
  overflowY: 'hidden',
  overflowX: 'auto',
})

export const bodyInner = style({
  width: 1100,
})

export const noOrders = style({
  color: theme.colors.textColorGrey,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  alignItems: 'center',
  padding: '32px 0',

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '64px 0',
    },
  },
})

export const title = style({
  marginRight: 'auto',
})

export const tabs = style({
  border: `1px solid ${theme.colors.border}`,
  background: 'none',
  padding: 2,
  marginLeft: 'auto',

  '@media': {
    [theme.mediaQueries.md()]: {
      margin: '0 24px',
    },
  },
})

export const tabsItem = style({
  padding: '6px 8px',
  opacity: 0.64,
})

export const tabsItemActive = style({
  background: theme.colors.common.green2,
  opacity: 1,
  color: theme.colors.textColorPrimary,
  borderRadius: 6,
  pointerEvents: 'none',
})

export const search = style({
  marginTop: 8,

  '@media': {
    [theme.mediaQueries.md()]: {
      marginTop: 0,
      marginRight: 16,
      maxWidth: 240,
    },
  },
})

export const actions = style({
  display: 'none',
  alignItems: 'center',
  gap: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'flex',
    },
  },
})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '16% 16% 14% 1fr 14% 8%',
  alignItems: 'center',
})

export const tableHeadings = style([
  row,
  {
    padding: '7px 16px',
  },
])

export const fs12 = style({
  fontSize: 12,
  lineHeight: '16px',
})

export const tableHeadingsButton = style([
  fs12,
  {
    justifyContent: 'flex-start',
    textAlign: 'left',
    pointerEvents: 'none',
  },
])

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto',
})

export const updatePrice = style({
  transition: 'transform 300ms ease-in-out',

  ':active': {
    transform: 'rotate(360deg)',
  },
})
