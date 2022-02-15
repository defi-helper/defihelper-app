import { style, createVar } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

const width = createVar()

export const root = style({})

export const header = style({
  marginBottom: 24,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const charts = style({
  display: 'grid',
  gap: 16,
  marginBottom: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: `repeat(auto-fit, minmax(${width}, 1fr))`,
      gap: 24,
      marginBottom: 24,

      vars: {
        [width]: '440px',
      },
    },

    [theme.mediaQueries.lg()]: {
      vars: {
        [width]: '540px',
      },
    },
  },
})
