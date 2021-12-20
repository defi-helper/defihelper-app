import { style } from '@vanilla-extract/css'

export const root = style({
  padding: 20,
  maxWidth: 352,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const title = style({
  marginBottom: 30,
})

export const proposal = style({
  marginBottom: 30,
  fontSize: 20,
})

export const button = style({
  width: '100%',
})
