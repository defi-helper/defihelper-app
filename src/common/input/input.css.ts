import { style } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const root = style({
  display: 'inline-flex',
  flexDirection: 'column',
  width: '100%',
  fontFamily: theme.fonts.square,
  position: 'relative',
  backgroundColor: theme.colors.common.black6,
  borderRadius: 8,
  fontSize: 16,
  lineHeight: '24px',
})

export const input = style({
  display: 'block',
  width: 'inherit',
  height: 'inherit',
  outline: 'none',
  border: 'none',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  textTransform: 'inherit',
  fontFamily: 'inherit',
  background: 'transparent',
  padding: '8px 16px',
  color: 'currentcolor',
})

export const label = style({
  position: 'absolute',
  pointerEvents: 'none',
  top: '50%',
  transform: 'translateY(-50%)',
  left: '16px',
  transition: 'transform .2s, font-size .2s',
})

export const error = style({})
