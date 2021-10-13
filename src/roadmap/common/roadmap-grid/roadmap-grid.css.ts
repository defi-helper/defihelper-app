import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gridGap: 24,
})
