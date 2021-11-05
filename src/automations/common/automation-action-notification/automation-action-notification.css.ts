import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: 'calc(100% - 40px)',
})

export const input = style({
  marginBottom: 16,
})
