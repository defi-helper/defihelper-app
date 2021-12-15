import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'grid',
  gridTemplateColumns: '15% 14% 10% 12% 12% 12% 1fr',
  padding: '0 24px 16px',
})

export const stake = style({
  gridColumnStart: 2,
})

export const input = style({
  marginBottom: 20,
})

export const claim = style({
  gridColumnStart: 6,
})

export const unstake = style({
  gridColumnStart: 4,
})
