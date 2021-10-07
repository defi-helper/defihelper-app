import { style } from '@vanilla-extract/css'

export const root = style({
  width: 352,
  height: 296,
  padding: '24px 32px 32px',
})

export const form = style({
  display: 'flex',
  flexDirection: 'column',
})

export const input = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 24,
    },
  },
})

export const buttons = style({
  display: 'flex',
  gap: 16,
})
