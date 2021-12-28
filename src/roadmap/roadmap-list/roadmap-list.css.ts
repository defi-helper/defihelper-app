import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const header = style({
  display: 'none',
  alignItems: 'center',
  marginBottom: 32,

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'flex',
    },
  },
})

export const searchButton = style({
  backgroundColor: theme.colors.paper,
  padding: 4,
  borderRadius: 6,
})

export const action = style({
  display: 'flex',
  gap: 8,
})

export const createMobile = style({
  width: 24,
  height: 24,
  padding: 6,
  borderRadius: 6,
})

export const input = style({
  maxWidth: 211,
  marginLeft: 'auto',
})

export const addButton = style({
  marginLeft: 24,
})

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
