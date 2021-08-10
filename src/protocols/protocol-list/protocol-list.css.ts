import { style } from '@vanilla-extract/css'

export const root = style({})

export const header = style({
  marginBottom: 28,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const protocols = style({
  padding: 0,
  margin: 0,
  listStyle: 'none',
})

export const link = style({
  textDecoration: 'none',
  width: '100%',
  color: 'currentcolor',
})

export const item = style({
  display: 'flex',
  marginBottom: 5,
  width: '100%',
})

export const card = style({
  padding: '10px 15px',
  display: 'flex',
  alignItems: 'center',
})

export const tokens = style({
  marginLeft: 'auto',
})

export const mr = style({
  marginRight: 20,
})
