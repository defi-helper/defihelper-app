import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
})

export const input = style({
  marginBottom: 16,
})

export const title = style({
  marginBottom: 10,
})

export const links = style({
  position: 'relative',
})

export const linksRemove = style({
  position: 'absolute',
  right: 0,
  top: 0,
})

export const linksAdd = style({
  width: 24,
  height: 24,
})

export const actionButtons = style({
  display: 'flex',
  gridGap: 10,
})
