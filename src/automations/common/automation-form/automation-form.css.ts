import { style, globalStyle } from '@vanilla-extract/css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: 'calc(100% - 43px)',
})

globalStyle(`${root} > button:first-of-type`, {
  marginTop: 'auto',
})
