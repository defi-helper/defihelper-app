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

export const form = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
})

export const input = style({
  margin: 'auto 0',
})
