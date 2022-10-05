import { style } from '@vanilla-extract/css'

export const root = style({
  width: 360,
  height: 568,
  padding: '24px 32px',
  display: 'flex',
  flexDirection: 'column',
})

export const fn = style({
  justifyContent: 'flex-start',
  margin: '20px 0',
})

export const input = style({
  margin: '10px 0',
  position: 'relative',
})

export const pow = style({
  marginLeft: 'auto',
})

export const kessak = style([
  pow,
  {
    border: `1px solid currentColor`,
    minWidth: 20,
    height: 20,
    padding: '0 3px',
    fontSize: 12,
  },
])
