import { style } from '@vanilla-extract/css'

export const root = style({
  padding: 0,
  margin: 0,
  listStyle: 'none',
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const icon = style({
  verticalAlign: 'middle',
})
