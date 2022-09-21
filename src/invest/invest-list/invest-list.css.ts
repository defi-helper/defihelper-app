import { style, globalStyle } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const header = style({
  display: 'none',
  alignItems: 'center',
  gap: 8,
  marginBottom: 32,

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'flex',
    },
  },
})

export const headerIcon = style({
  width: 36,
  height: 36,
})

export const search = style({
  '@media': {
    [theme.mediaQueries.md()]: {
      marginLeft: 'auto',
      maxWidth: 211,
    },
  },
})

globalStyle(`${search} input`, {
  backgroundColor: theme.colors.paper,
})

export const tabs = style({
  marginBottom: 32,
})
