import { composeStyles, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const tableWrap = style({
  overflowX: 'auto',
  overflowY: 'hidden',
})

export const table = style({
  padding: 16,
  minWidth: 900,

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '24px 26px',
    },
  },
})

export const tableRow = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 16,
    },
  },
})

export const tableHeader = composeStyles(
  tableRow,
  style({
    color: theme.colors.textColorGrey,
  })
)

export const tableBody = style({})

export const tableCol = style({})
