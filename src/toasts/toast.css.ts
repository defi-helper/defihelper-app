import { style, globalStyle } from '@vanilla-extract/css'

export const root = style({
  position: 'fixed',
  right: 10,
  top: 10,
  zIndex: 10000,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
})

globalStyle(`${root} > * + *`, {
  marginTop: 20,
})
