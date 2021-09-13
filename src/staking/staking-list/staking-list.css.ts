import { globalStyle, style } from '@vanilla-extract/css'

export const root = style({
  padding: 0,
  margin: 0,
  listStyle: 'none',
})

export const card = style({
  padding: '10px 15px',
  marginBottom: 5,
  display: 'flex',
  alignItems: 'center',
})

export const clickable = style({
  cursor: 'pointer',
})

export const icons = style({
  display: 'flex',
})

globalStyle(`${icons} > *:first-child`, {
  marginRight: -3,
})

globalStyle(`${icons} > *:last-child`, {
  marginLeft: -3,
})

export const tvl = style({
  marginLeft: 'auto',
})

export const mr = style({
  marginRight: 10,
})
