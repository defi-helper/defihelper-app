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

  '@media': {
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
    },

    [theme.mediaQueries.lg()]: {
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
  background: 'transparent',

  '@media': {
    [theme.mediaQueries.md()]: {
      background: theme.colors.paper,
      minWidth: 1100,
    },
  },
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
    display: 'none',

    '@media': {
      [theme.mediaQueries.md()]: {
        display: 'grid',
      },
    },
  },
])

export const tableName = style({
  paddingLeft: 28,
})

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto',
  width: '100%',
})

export const apyboostQuestion = style({
  color: theme.colors.textColorGrey,
  verticalAlign: 'middle',
})

export const dropdown = style({
  width: 252,
})

export const autostakingTooltipTitle = style({
  color: theme.colors.textColorGreen,
  marginBottom: 8,
})

export const autostakingTooltipText = style({
  marginBottom: 16,
})

export const apyBoost = style({
  justifyContent: 'flex-end',
  textAlign: 'right',
})
