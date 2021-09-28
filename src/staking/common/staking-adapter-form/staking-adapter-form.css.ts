import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'grid',
  gridTemplateColumns: '21% 15% 10% 14% 14% 12% 1fr',
  padding: '0 24px 16px',
})

export const input = style({
  marginBottom: 20,
})

export const turnOn = style({
  gridColumnStart: 4,
})

export const claim = style({
  gridColumnStart: 7,
})
