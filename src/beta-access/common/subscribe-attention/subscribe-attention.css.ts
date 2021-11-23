import { style } from '@vanilla-extract/css'

export const root = style({
  padding: 20,
  maxWidth: 352,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const title = style({
  marginBottom: 30,
})

export const button = style({
  width: '100%',
})
