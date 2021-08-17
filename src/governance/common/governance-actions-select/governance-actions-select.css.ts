import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
})

export const option = style({
  padding: '10px 16px',
  justifyContent: 'flex-start',
  margin: '0 -16px',
})

export const title = style({
  marginBottom: 24,
})
