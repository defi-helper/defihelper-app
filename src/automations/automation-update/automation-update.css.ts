import { style } from '@vanilla-extract/css'

export const root = style({
  padding: 20,
  width: 700,
})

export const dropdown = style({
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  padding: 20,
})
