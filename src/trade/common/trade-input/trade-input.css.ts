import { style, globalStyle } from '@vanilla-extract/css'

export const root = style({})

globalStyle(`${root} > div`, {
  borderRadius: 6,
})

globalStyle(`${root} input`, {
  fontSize: 14,
  lineHeight: '20px',
  padding: '6px 12px',
})

globalStyle(`${root} input + div`, {
  paddingRight: 12,
})
