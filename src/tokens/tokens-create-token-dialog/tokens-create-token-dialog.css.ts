import { style } from '@vanilla-extract/css'

export const root = style({
  padding: 30,
  width: 600,
})

export const title = style({
  marginBottom: 30,
})

export const formField = style({
  marginBottom: 15,
})

export const aliasIcon = style({
  marginRight: 15,
  width: 24,
  height: 24,
})

export const tokenAliasSearchInput = style({
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderRadius: 0,
})

export const aliasIconPlaceholder = style({
  borderRadius: 24,
  background: '#bbb',
  height: 24,
  width: 24,
  marginRight: 15,
})
