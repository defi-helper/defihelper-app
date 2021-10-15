import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const header = style({
  display: 'flex',
  marginBottom: 24,
  gap: 23,
})

export const title = style({})

export const grey = style({
  color: theme.colors.textColorGrey,
})

export const table = style({
  padding: '24px 26px',
})

export const tableRow = style({
  display: 'grid',
  gridTemplateColumns: '7% 13% 13% 12% 9% 11% 13% 10% 12%',

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 16,
    },
  },
})

export const tableHeader = style({
  color: theme.colors.textColorGrey,
})

export const tableBody = style({})

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

export const assetIcon = style({
  width: 24,
  height: 24,
  verticalAlign: 'middle',
})
