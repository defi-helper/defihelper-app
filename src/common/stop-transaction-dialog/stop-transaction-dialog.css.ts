import { style } from '@vanilla-extract/css'

export const root = style({
  maxWidth: 352,
  width: '100%',
  height: 192,
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 32px 32px',
})

export const title = style({
  marginBottom: 10,
})

export const buttons = style({
  display: 'flex',
  gap: 8,
  marginTop: 'auto',
})
