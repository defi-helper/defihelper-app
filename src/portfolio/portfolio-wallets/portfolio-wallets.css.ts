import { composeStyles, style } from '@vanilla-extract/css'

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

export const addWallet = style({
  '@media': {
    [theme.mediaQueries.down(959)]: {
      padding: 6,
      width: 24,
      height: 24,
    },
  },
})

export const addWalletAdmin = composeStyles(
  addWallet,
  style({
    marginRight: 10,
  })
)

export const addWalletTitle = style({
  marginLeft: 11,
  display: 'none',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'inline',
    },
  },
})

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
  gridTemplateColumns: '28% 40% 6% 26%',

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
