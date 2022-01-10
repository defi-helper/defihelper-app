import { style } from '@vanilla-extract/css'

export const root = style({
  width: '100%',
})

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  padding: 32,
})

export const input = style({
  marginBottom: 24,
})

export const button = style({
  display: 'flex',
  gap: 8,
})
