import { style } from '@vanilla-extract/css'

export const root = style({
  padding: 20,
  maxWidth: 352,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
})

export const text = style({
  marginBottom: 20,
})

export const actions = style({
  display: 'flex',
  gap: 10,
})
