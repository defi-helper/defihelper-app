import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'grid',
  gridTemplateColumns: '15% 14% 13% 13% 13% 13% 1fr',
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

export const input = style([
  button,
  {
    marginBottom: 20,
  },
])

export const claim = style([
  button,
  {
    gridColumnStart: 6,
  },
])

export const unstake = style([
  button,
  {
    gridColumnStart: 4,
  },
])

export const tooltip = style({
  width: 300,
})

export const turnOn = style([
  button,
  {
    width: '60%',
  },
])
