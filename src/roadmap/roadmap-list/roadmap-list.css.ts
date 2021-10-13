import { style } from '@vanilla-extract/css'

export const header = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 32,
})

export const input = style({
  maxWidth: 211,
  marginLeft: 'auto',
})

export const addButton = style({
  marginLeft: 24,
})

export const grid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gridGap: 24,
})
