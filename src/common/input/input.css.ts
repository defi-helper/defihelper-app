import { style, globalStyle } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  display: 'inline-flex',
  flexDirection: 'column',
  width: '100%',
  position: 'relative',
})

export const disabled = style({
  pointerEvents: 'none',
  opacity: 0.8,
})

export const inputWrap = style({
  border: `1px solid ${theme.colors.border}`,
  borderRadius: 8,
  transition: 'border .2s ease-in-out',
  display: 'flex',
  background: theme.colors.paper,

  '@media': {
    [theme.mediaQueries.hover()]: {
      ':hover': {
        borderColor: theme.colors.textColorGrey,
      },
    },
  },
})

export const inputWrapFocus = style({
  borderColor: theme.colors.textColorPrimary,
})

export const input = style({
  display: 'block',
  width: '100%',
  height: 'inherit',
  outline: 'none',
  textTransform: 'inherit',
  fontFamily: theme.fonts.square,
  backgroundColor: 'transparent',
  fontSize: 16,
  lineHeight: '24px',
  padding: '8px 16px',
  color: 'currentcolor',
  border: 'none',
  flexGrow: 1,
  borderRadius: 8,

  '::placeholder': {
    color: 'inherit',
  },
})

globalStyle(`${input}:focus::placeholder`, {
  color: theme.colors.primaryButtonBorder,
})

export const textarea = style({
  resize: 'none',
})

export const error = style({})

globalStyle(`${error} ${input}`, {
  borderColor: theme.colors.common.red1,
})

export const label = style({
  color: theme.colors.textColorGrey,
  marginBottom: 4,
  display: 'flex',
  alignItems: 'center',
})

export const helperText = style({})

export const fs14 = style({
  fontSize: 14,
  lineHeight: '20px',
})

export const helperTextColor = style({
  color: theme.colors.textColorGrey,
})

export const side = style({
  background: theme.colors.paper,
  display: 'flex',
  alignItems: 'center',
  borderRadius: 8,
})

export const leftSide = style([
  side,
  {
    padding: '0 0 0 16px',
  },
])

export const rightSide = style([
  side,
  {
    padding: '0 16px 0 0',
  },
])
