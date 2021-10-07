import { style } from '@vanilla-extract/css'

export const root = style({})

export const section = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 72,
    },
  },
})
