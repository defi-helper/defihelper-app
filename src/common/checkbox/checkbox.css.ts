import { globalStyle, style } from '@vanilla-extract/css'

export const root = style({
  display: 'inline-flex',
  position: 'relative',
  outline: 0,
  border: 0,
  margin: 0,
  cursor: 'pointer',
  userSelect: 'none',
  verticalAlign: 'middle',
  appearance: 'none',
  textDecoration: 'none',
})

export const input = style({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  opacity: 0,
  zIndex: 1,
  margin: 0,
  cursor: 'pointer',
})

export const checkbox = style({
  opacity: 0.8,
  border: '2px solid currentColor',
  borderRadius: 4,
  width: 16,
  height: 16,
  display: 'inline-block',
  position: 'relative',

  ':before': {
    content: '""',
    position: 'absolute',
    top: 3,
    left: 3,
    bottom: 3,
    right: 3,
    opacity: 0,
    background: 'currentcolor',
    borderRadius: 'inherit',
  },
})

globalStyle(`${input}:checked ~ ${checkbox}:before`, {
  opacity: 1,
})
