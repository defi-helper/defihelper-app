import { style } from '@vanilla-extract/css'

export const root = style({
  width: 360,
  height: 260,
  padding: '24px 32px',
})

export const title = style({
  marginBottom: 24,
})

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100% - 44px)',
})

export const input = style({
  marginBottom: 10,
})

export const button = style({
  marginTop: 'auto',
})
