import { style, createVar } from '@vanilla-extract/css'
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
