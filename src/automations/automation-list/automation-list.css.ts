import { composeStyles, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const header = style({
  marginBottom: 40,
  display: 'none',
  gap: 24,

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'flex',
    },
  },
})

export const title = style({
  display: 'flex',
  alignItems: 'center',
})

export const grid = style({
  display: 'grid',
  gap: 24,

  '@media': {
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(352px, 1fr))',
    },
  },

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 120,
    },
  },
})

export const countDesktop = style({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  padding: '0 12px',
})

export const countMobile = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: 4,
})

export const countTitle = style({
  fontSize: 12,
  lineHeight: '16px',
})

export const searchDesktop = style({
  maxWidth: 211,
})

export const action = style({
  display: 'flex',
  gap: 8,
  alignItems: 'center',
})

export const searchButton = style({
  backgroundColor: theme.colors.paper,
  padding: 4,
  borderRadius: 6,
})

export const addAutomations = style({
  width: 24,
  height: 24,
  padding: 0,
})

export const left = style({
  display: 'none',
  marginLeft: 6,

  '@media': {
    [theme.mediaQueries.lg()]: {
      display: 'inline',
    },
  },
})

export const contractTitle = style({
  marginBottom: 24,
})

export const manageButton = style({
  width: 24,
  height: 24,
  padding: 6,
  position: 'absolute',
  top: 0,
  bottom: 0,
  margin: 'auto',
  right: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      right: 26,
    },
  },
})

export const table = style({
  overflowX: 'auto',
  overflowY: 'hidden',
})

export const tableInner = style({
  minWidth: 900,
})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  padding: '0 32px 8px',
  position: 'relative',
})

export const tableheader = composeStyles(
  row,
  style({
    padding: '16px 32px',
    borderBottom: `1px solid ${theme.colors.border}`,
    marginBottom: 16,
    color: theme.colors.textColorGrey,
    position: 'relative',
  })
)

export const loader = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 32px',
  minHeight: 420,
})

export const loaderIcon = style({
  width: 94,
  height: 52,
  margin: 'auto',
})
