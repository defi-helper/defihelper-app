import { style } from '@vanilla-extract/css'

export const root = style({
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 258,
  minHeight: 216,
})

export const protocolTitle = style({
  display: 'flex',
  gap: 9,
  marginBottom: 16,
})

export const sellButton = style({
  marginTop: 'auto',
})
