import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'flex',
  gap: 8,
})

export const group = style({
  position: 'relative',
})

export const groupActive = style({
  pointerEvents: 'none',
})

export const groupLoader = style({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  margin: 'auto',
})

export const groupLabel = style({
  opacity: 0.32,
})

export const groupLabelActive = style({
  opacity: 1,
})

export const groupLabelLoading = style({
  pointerEvents: 'none',
  opacity: 0,
})
