import { style } from '@vanilla-extract/css'

export const root = style({
  width: 360,
  height: 568,
  padding: '24px 32px',
  display: 'flex',
  flexDirection: 'column',
})

export const option = style({
  padding: '10px 16px',
  justifyContent: 'flex-start',
  margin: '0 -16px',
})
