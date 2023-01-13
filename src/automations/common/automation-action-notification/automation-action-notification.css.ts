import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flex: '1 0 auto',
})

export const input = style({
  marginBottom: 16,
})

export const disable = style({
  pointerEvents: 'none',
})
