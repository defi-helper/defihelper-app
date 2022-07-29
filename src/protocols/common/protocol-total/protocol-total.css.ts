import { createVar, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

const width = createVar()

export const total = style({
  display: 'grid',
  gap: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: `repeat(auto-fit, minmax(${width}, 1fr))`,
      gap: 24,
    },

    [theme.mediaQueries.up(1071)]: {
      vars: {
        [width]: '250px',
      },
    },

    [theme.mediaQueries.lg()]: {
      vars: {
        [width]: '300px',
      },
    },
  },
})

export const valueChange = style({
  fontSize: 16,
})

export const totalTitle = style({
  color: theme.colors.textColorGrey,
  marginBottom: 4,
})

export const totalItem = style({
  padding: '24px 32px 32px',
})

export const link = style({
  color: theme.colors.textColorGreen,
})

export const changePlus = style({
  color: theme.colors.common.green2,
})

export const changeMinus = style({
  color: theme.colors.common.red1,
})

export const more = style([
  totalItem,
  {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
])
