import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'grid',
  gridTemplateColumns: '14% 13% 12% 11% 11% 11% 11% 1fr',
  padding: '0 0 16px 24px',
})

export const button = style({
  display: 'flex',
  justifyContent: 'flex-end',
})

export const stake = style([
  button,
  {
    gridColumnStart: 2,
  },
])

export const buyLP = style([
  button,
  {
    gridColumnStart: 3,
  },
])

export const input = style([
  button,
  {
    marginBottom: 20,
  },
])

export const claim = style([
  button,
  {
    gridColumnStart: 7,
  },
])

export const unstake = style([
  button,
  {
    gridColumnStart: 5,
  },
])

export const turnOn = style([
  button,
  {
    marginRight: 24,
  },
])
