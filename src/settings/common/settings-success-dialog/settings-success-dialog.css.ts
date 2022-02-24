import { style } from '@vanilla-extract/css'

export const root = style({
  width: 352,
  padding: '24px 32px 32px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const title = style({
  marginBottom: 10,
})

export const actions = style({
  display: 'flex',
  gap: 8,
})

export const button = style({
  width: '100%',
})
