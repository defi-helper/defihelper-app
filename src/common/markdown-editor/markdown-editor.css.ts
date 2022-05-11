import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  position: 'relative',
  display: 'inline-flex',
  flexDirection: 'column',
  width: '100%',
})

export const input = style({
  display: 'block',
  width: 'inherit',
  height: 'inherit',
  outline: 'none',
  border: `1px solid ${theme.colors.border}`,
  textTransform: 'inherit',
  fontFamily: theme.fonts.square,
  backgroundColor: 'transparent',
  borderRadius: 8,
  fontSize: 16,
  lineHeight: '24px',
  padding: '8px 16px',
  color: 'currentcolor',

  '::placeholder': {
    color: 'inherit',
  },
})

export const label = style({
  fontFamily: theme.fonts.mono,
  textTransform: 'uppercase',
  color: theme.colors.textColorGrey,
  marginBottom: 4,
})

globalStyle(`${input} .ProseMirror`, {
  outline: 'none',
  height: '100%',
})

globalStyle(`${input} .ProseMirror *`, {
  margin: 0,
  padding: 0,
})

globalStyle(`${input} a`, {
  color: theme.colors.common.blue1,
})

globalStyle(`${input} strong`, {
  fontWeight: 'bold',
})
