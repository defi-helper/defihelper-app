import { style } from '@vanilla-extract/css'

export const root = style({
  padding: '24px 32px',
  minHeight: 168,
  display: 'flex',
  flexDirection: 'column',
})

export const title = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const subtitle = style({
  opacity: 0.64,
  marginBottom: 10,
})

export const icon = style({
  width: 20,
  height: 20,
  verticalAlign: 'middle',
  marginRight: 4,
})

export const buttons = style({
  display: 'flex',
  gap: 12,
  marginTop: 'auto',
})
