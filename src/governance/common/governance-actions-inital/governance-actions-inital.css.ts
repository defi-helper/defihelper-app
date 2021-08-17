import { style } from '@vanilla-extract/css'

export const title = style({
  marginBottom: 52,
})

export const button = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 16,
      marginTop: 'auto',
    },
  },
})
