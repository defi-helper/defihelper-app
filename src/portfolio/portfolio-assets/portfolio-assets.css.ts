import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const header = style({
  display: 'flex',
  marginBottom: 16,
  gap: 23,

  '@media': {
    [theme.mediaQueries.md()]: {
      marginBottom: 24,
    },
  },
})

export const title = style({})

export const grey = style({
  color: theme.colors.textColorGrey,
})

export const tableWrap = style({
  overflowX: 'auto',
  overflowY: 'hidden',
})

export const table = style({
  minWidth: 900,
})

export const tableRow = style({
  display: 'grid',
  gridTemplateColumns: '10% 60% 15% 15%',

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 16,
    },
  },
})

export const tableHeader = style({
  padding: '16px 26px',
  borderBottom: `1px solid ${theme.colors.border}`,
  display: 'flex',
  justifyContent: 'space-between',
})

export const tableHeadings = style({
  color: theme.colors.textColorGrey,
  padding: '16px 26px 0',
})

export const tableBody = style({
  padding: '0 26px 16px',
})

export const tableCol = style({})

export const dropdown = style({
  width: 296,
  height: 132,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const blue = style({
  color: theme.colors.common.blue1,
})

export const question = style({
  verticalAlign: 'middle',
})

export const positive = style({
  color: theme.colors.common.green2,
})

export const negative = style({
  color: theme.colors.common.red1,
})

export const select = style({
  width: 200,
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 16px',
})

export const selectArrow = style({
  marginLeft: 4,
})

export const selectOption = style({
  justifyContent: 'flex-start',
})

export const selectOptionActive = style({
  opacity: 0.4,
})
