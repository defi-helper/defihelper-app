import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  position: 'relative',
  fontFamily: theme.fonts.mono,
  textTransform: 'uppercase',
  fontSize: 20,
  lineHeight: '28px',
})

export const input = style({
  display: 'inline-flex',
  flexDirection: 'column',
  width: '100%',
  fontFamily: 'inherit',
  textTransform: 'inherit',
  position: 'relative',
  backgroundColor: theme.colors.common.black6,
  borderRadius: 10,
  fontSize: 'inherit',
  lineHeight: 'inherit',
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

globalStyle(`${input} .ProseMirror`, {
  outline: 'none',
  height: '100%',
  padding: '0 16px',
})
