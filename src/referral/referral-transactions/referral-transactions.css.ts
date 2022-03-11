import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const title = style({
  marginBottom: 28,
  display: 'none',

  '@media': {
    [theme.mediaQueries.lg()]: {
      display: 'block',
    },
  },
})

export const subtitle = style({
  fontSize: 24,
  lineHeight: '32px',
  marginBottom: 16,

  '@media': {
    [theme.mediaQueries.lg()]: {
      fontSize: 48,
      lineHeight: '56px',
      marginBottom: 24,
    },
  },
})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  padding: 16,
  gap: 8,

  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.colors.border}`,
    },
  },

  '@media': {
    [theme.mediaQueries.lg()]: {
      gridTemplateColumns: '1fr 14% 10% 10% 10% 14%',
      gap: 40,
      padding: '16px 24px',
    },
  },
})

export const informationColumn = style({
  gridColumnStart: 1,
  gridColumnEnd: 3,
})

export const addedColumn = style({
  gridColumnStart: 3,
  gridColumnEnd: 5,
})

export const grey = style({
  color: theme.colors.textColorGrey,
})

export const header = style([row, grey])

export const labelMobile = style([
  grey,
  {
    '@media': {
      [theme.mediaQueries.lg()]: {
        display: 'none',
      },
    },
  },
])

export const wallet = style({
  gridColumnStart: 1,
  gridColumnEnd: 5,

  '@media': {
    [theme.mediaQueries.lg()]: {
      gridColumnStart: 'unset',
      gridColumnEnd: 'unset',
    },
  },
})

export const transaction = style({
  gridColumnStart: 1,
  gridColumnEnd: 5,

  '@media': {
    [theme.mediaQueries.lg()]: {
      gridColumnStart: 'unset',
      gridColumnEnd: 'unset',
    },
  },
})

export const level = style({
  '@media': {
    [theme.mediaQueries.lg()]: {},
  },
})

export const clientPaid = style({
  '@media': {
    [theme.mediaQueries.lg()]: {},
  },
})

export const income = style({
  '@media': {
    [theme.mediaQueries.lg()]: {},
  },
})

export const added = style({
  '@media': {
    [theme.mediaQueries.lg()]: {},
  },
})
