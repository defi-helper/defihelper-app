import { style } from '@vanilla-extract/css'

export const root = style({
  width: 352,
})

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  padding: 32,
})

export const input = style({
  marginBottom: 24,
})

export const buttons = style({
  display: 'flex',
  gap: 8,
})

export const title = style({
  marginBottom: 20,
})
