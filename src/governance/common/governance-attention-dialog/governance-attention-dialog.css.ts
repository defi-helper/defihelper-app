import { style } from '@vanilla-extract/css'

export const root = style({
  maxWidth: 496,
  width: '100%',
  borderRadius: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 30,
  padding: 40,
  position: 'relative',
  height: '560px',
})

export const button = style({
  marginTop: 'auto',
})
