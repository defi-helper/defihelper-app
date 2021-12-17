import { style, globalStyle } from '@vanilla-extract/css'

export const input = style({
  marginBottom: 16,
})

export const wallet = style({})

globalStyle(`${wallet} > button`, {
  gap: 'unset',
})
