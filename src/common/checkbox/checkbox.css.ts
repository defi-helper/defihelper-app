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
  display: 'inline-block',
  position: 'relative',
})

export const checkboxChecked = style({
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 0,
})

export const checked = style({})

globalStyle(`${input}:checked ~ ${checkbox}, ${checked} ${checkbox}`, {
  opacity: 0,
})

globalStyle(
  `${input}:checked ~ ${checkboxChecked}, ${checked} ${checkboxChecked}`,
  {
    opacity: 1,
  }
)
