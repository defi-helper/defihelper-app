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

export const row = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
  alignItems: 'center',
  padding: '20px 16px',

  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.colors.border}`,
    },
  },
})

export const tableHeader = style([
  row,
  {
    padding: '16px 105px 16px 44px',
    color: theme.colors.textColorGrey,
    display: 'none',

    '@media': {
      [theme.mediaQueries.md()]: {
        display: 'grid',
      },
    },
  },
])
