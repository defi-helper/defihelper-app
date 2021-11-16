import { style, globalStyle } from '@vanilla-extract/css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
})

globalStyle(`${root} > *`, {
  marginBottom: 20,
})
