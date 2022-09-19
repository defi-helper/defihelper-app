import { style, globalStyle } from '@vanilla-extract/css'

export const small = style({})

globalStyle(`${small} > div`, {
  borderRadius: 6,
})

globalStyle(`${small} input`, {
  fontSize: 14,
  lineHeight: '20px',
  padding: '6px 12px',
})

globalStyle(`${small} input + div`, {
  paddingRight: 12,
})
