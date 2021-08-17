import { style } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const root = style({
  display: 'inline-flex',
  flexDirection: 'column',
  width: '100%',
  fontFamily: theme.fonts.mono,
  textTransform: 'uppercase',
  position: 'relative',
  backgroundColor: theme.colors.common.black6,
  borderRadius: 10,
  fontSize: 20,
  lineHeight: '28px',
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
  padding: '12px 16px',
})

export const label = style({
  position: 'absolute',
  pointerEvents: 'none',
  top: '50%',
  transform: 'translateY(-50%)',
  left: '16px',
  transition: 'transform .2s, font-size .2s',
})

export const focusedLabel = style({
  fontSize: 12,
  lineHeight: '16px',
  opacity: 0.63,
  transform: 'translateY(-25px)',
})
