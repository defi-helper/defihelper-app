import { style } from '@vanilla-extract/css'

export const header = style({
  marginBottom: 24,
})

export const list = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridGap: 24,
})
