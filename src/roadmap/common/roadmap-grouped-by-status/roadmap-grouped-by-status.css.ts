import { style, styleVariants } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  display: 'flex',
  overflowX: 'auto',
  overflowY: 'hidden',
  gap: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      gap: 24,
    },
  },
})

export const list = style({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  width: 258,
  minHeight: 258,

  '@media': {
    [theme.mediaQueries.md()]: {
      gap: 16,
    },
  },
})

export const colTitle = style({
  display: 'block',
  textDecoration: 'none',
  marginBottom: 8,

  '@media': {
    [theme.mediaQueries.md()]: {
      marginBottom: 16,
    },
  },
})

export const colTitles = styleVariants({
  open: {
    color: theme.colors.common.pink3,
  },

  executed: {
    color: theme.colors.common.green2,
  },

  defeated: {
    color: theme.colors.common.red1,
  },

  in_process: {
    color: theme.colors.common.blue1,
  },
})
