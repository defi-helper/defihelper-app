import { style, globalStyle } from '@vanilla-extract/css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flex: '1 0 auto',
})

globalStyle(`${root} > button:first-of-type`, {
  marginTop: 'auto',
})
