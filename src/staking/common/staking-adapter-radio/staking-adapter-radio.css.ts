import { style, globalStyle } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const root = style({
  display: 'inline-flex',
  position: 'relative',
  outline: 0,
  border: 0,
  margin: 0,
  cursor: 'pointer',
  userSelect: 'none',
  verticalAlign: 'middle',
  appearance: 'none',
  textDecoration: 'none',
})

export const disabled = style({
  pointerEvents: 'none',
  opacity: 0.8,
})

export const input = style({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  opacity: 0,
  zIndex: 1,
  margin: 0,
  cursor: 'pointer',
})

export const radio = style({
  opacity: 0.8,
  border: '2px solid currentColor',
  borderRadius: 16,
  display: 'inline-block',
  position: 'relative',
  padding: '0px 16px',
  color: 'inherit',
  zIndex: 1,

  ':before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0,
    background: 'currentcolor',
    borderRadius: 14,
    zIndex: -1,
  },
})

export const text = style({
  color: 'inherit',
})

globalStyle(`${input}:checked ~ ${radio} ${text}`, {
  color: theme.colors.textColorSecondary,
})

globalStyle(`${input}:checked ~ ${radio}:before`, {
  opacity: 1,
})
