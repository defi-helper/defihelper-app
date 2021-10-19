import { style } from '@vanilla-extract/css'

export const root = style({
  padding: 32,
  width: 352,
})

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

export const input = style({
  marginBottom: 24,
  width: '100%',
})
