import { style } from '@vanilla-extract/css'

export const pow = style({
  position: 'absolute',
  bottom: 'calc(100% + 5px)',
  right: 0,
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
