import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const header = style({
  marginBottom: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      marginBottom: 32,
    },
  },
})

export const list = style({
  display: 'grid',
  gap: 24,
  minHeight: 314,
  gridTemplateColumns: 'repeat(auto-fill, minmax(277px, 1fr))',

  '@media': {
    [theme.mediaQueries.sm()]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(351px, 1fr))',
    },
  },
})

export const addButton = style({
  '@media': {
    [theme.mediaQueries.down(959)]: {
      padding: 6,
      width: 24,
      height: 24,
    },
  },
})

export const addButtonTitle = style({
  display: 'none',
  marginLeft: 11,

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'inline',
    },
  },
})

export const showEmptyWallets = style({
  fontSize: 20,
  lineHeight: '28px',
  color: theme.colors.common.blue1,
  width: '100%',
  marginTop: 32,
})
