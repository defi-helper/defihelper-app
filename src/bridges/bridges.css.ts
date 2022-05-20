import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const header = style({
  display: 'none',
  alignItems: 'center',
  marginBottom: 40,

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'flex',
    },
  },
})

export const list = style({
  padding: 0,
  margin: 0,
  listStyle: 'none',
  display: 'grid',
  gap: 8,

  '@media': {
    [theme.mediaQueries.md()]: {
      gap: 24,
      gridTemplateColumns: '1fr 1fr',
    },

    [theme.mediaQueries.lg()]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
  },
})

export const card = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: 24,
})

export const cardIcon = style({
  width: 16,
  height: 16,
  borderRadius: '50%',
})

export const cardLinkIcon = style({
  marginLeft: 'auto',
})
