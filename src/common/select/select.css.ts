import { style } from '@vanilla-extract/css'

export const root = style({})

export const dropdown = style({
  zIndex: 1000,
  maxHeight: 400,
  overflowX: 'hidden',
  overflowY: 'auto',
})

export const option = style({
  justifyContent: 'flex-start',
})

export const active = style({
  opacity: 0.4,
  pointerEvents: 'none',
})
