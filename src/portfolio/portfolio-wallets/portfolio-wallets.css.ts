import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 24,
})

export const title = style({
  marginRight: 'auto',
})

export const addWalletAdmin = style({
  marginRight: 10,
})

export const table = style({
  padding: '24px 26px',
})

export const tableRow = style({
  display: 'grid',
  gridTemplateColumns: '19% 19% 11% 6% 9% 13% 10% 12%',

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 16,
    },
  },
})

export const tableHeader = style({
  color: theme.colors.textColorGrey,
})

export const positive = style({
  color: theme.colors.common.green2,
})

export const negative = style({
  color: theme.colors.common.red1,
})

export const tableBody = style({})

export const blockchainIcon = style({
  width: 24,
  height: 24,
  verticalAlign: 'middle',
})
