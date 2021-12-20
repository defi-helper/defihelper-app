import { style } from '@vanilla-extract/css'

export const list = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(351px, 1fr))',
  gridGap: 24,
  minHeight: 168,
})

export const carousel = style({
  marginLeft: -16,
  marginRight: -16,
})
