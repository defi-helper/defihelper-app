import { style } from '@vanilla-extract/css'

export const title = style({
  marginBottom: 24,
})

export const action = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 32,
    },
  },
})

export const input = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 10,
    },
  },
})
