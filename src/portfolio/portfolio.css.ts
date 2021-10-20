import { style } from '@vanilla-extract/css'

export const title = style({
  marginBottom: 28,
})

export const cards = style({
  marginBottom: 24,
})

export const grid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 24,
})

export const mainChart = style({
  gridColumnStart: 1,
  gridColumnEnd: 3,
})

export const section = style({
  marginBottom: 64,
})
