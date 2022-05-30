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

export const row = style({
  alignItems: 'center',
  padding: '20px 16px',
  gap: 30,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 10% 12% 14% 19%',

  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.colors.border}`,
    },
  },
})

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
