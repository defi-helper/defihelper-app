import { style } from '@vanilla-extract/css'

export const root = style({
  maxWidth: 496,
  width: '100%',
  borderRadius: 24,
  display: 'flex',
  flexDirection: 'column',
  padding: 40,
  position: 'relative',
  height: '560px',
})

export const subtitle = style({
  marginBottom: 'auto',
})

export const self = style({
  marginBottom: 16,
})
