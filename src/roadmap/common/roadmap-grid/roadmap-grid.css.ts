import { style, createVar, styleVariants } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

const width = createVar()

export const root = style({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fit, minmax(${width}, 1fr))`,
  gridGap: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      gridGap: 24,

      vars: {
        [width]: '306px',
      },
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
