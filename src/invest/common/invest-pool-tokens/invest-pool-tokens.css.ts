import { style } from '@vanilla-extract/css'

export const tokenIcons = style({
  display: 'flex',
  alignItems: 'center',
})

export const tokenIcon = style({
  width: 24,
  height: 24,

  selectors: {
    '&:not(:last-child)': {
      marginRight: -4,
    },
  },
})
