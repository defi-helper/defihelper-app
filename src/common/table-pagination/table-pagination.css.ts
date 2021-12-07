import { style } from '@vanilla-extract/css'

export const pagination = style({
  display: 'flex',
  alignItems: 'center',
})

export const paginationCount = style({
  fontSize: '14px',
  lineHeight: '20px',
  marginRight: 16,
  opacity: 0.64,
})

export const paginationButton = style({
  opacity: 0.16,
  width: 24,
  height: 24,
  border: '1px solid currentColor',
  borderRadius: 4,

  selectors: {
    '&:not(:last-child)': {
      marginRight: 8,
    },
  },
})
