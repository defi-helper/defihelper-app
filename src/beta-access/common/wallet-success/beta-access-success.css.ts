import { style } from '@vanilla-extract/css'

export const root = style({
  padding: 20,
  maxWidth: 500,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const title = style({
  marginBottom: 30,
})
