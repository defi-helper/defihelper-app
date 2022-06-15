import { style } from '@vanilla-extract/css'

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
})

export const createApiInstructionLink = style({
  color: '#3773ff',
})

export const input = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 24,
    },
  },
})
