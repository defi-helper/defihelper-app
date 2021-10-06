import { style } from '@vanilla-extract/css'

export const root = style({})

export const header = style({
  marginBottom: 32,
})

export const list = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: 24,
  minHeight: 314,
})
