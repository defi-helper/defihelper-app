import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: 0,
  margin: 0,
  border: 0,
  backgroundColor: 'transparent',
  outline: 0,
  fontFamily: 'inherit',
  color: 'currentColor',
  textDecoration: 'none',
  textTransform: 'inherit',
})

export const disabled = style({
  pointerEvents: 'none',
  opacity: 0.6,
})
