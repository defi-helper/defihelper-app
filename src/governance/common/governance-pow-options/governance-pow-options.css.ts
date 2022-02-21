import { style } from '@vanilla-extract/css'

export const pow = style({
  display: 'flex',
})

export const powOption = style({
  border: `1px solid currentColor`,
  minWidth: 20,
  height: 20,
  padding: '0 3px',
  fontSize: 12,

  selectors: {
    '&:not(:last-child)': {
      marginRight: 5,
    },
  },
})
