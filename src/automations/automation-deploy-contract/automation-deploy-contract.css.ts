import { style } from '@vanilla-extract/css'

export const root = style({
  width: 500,
  height: 500,
  padding: 20,
})

export const form = style({
  display: 'flex',
  flexDirection: 'column',
})

export const input = style({
  marginBottom: 20,
})
