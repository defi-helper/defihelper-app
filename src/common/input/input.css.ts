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
  transition: 'border .2s ease-in-out',

  '::placeholder': {
    color: 'inherit',
  },

  '@media': {
    [theme.mediaQueries.hover()]: {
      ':hover': {
        borderColor: theme.colors.textColorGrey,
      },
    },
  },

  ':focus': {
    borderColor: theme.colors.textColorPrimary,
  },
})

export const textarea = style({
  resize: 'none',
})

export const error = style({})

globalStyle(`${error} ${input}`, {
  borderColor: theme.colors.common.red1,
})

export const label = style({
  fontFamily: theme.fonts.mono,
  textTransform: 'uppercase',
  color: theme.colors.textColorGrey,
  marginBottom: 4,
})

export const helperText = style({})

export const fs14 = style({
  fontSize: 14,
  lineHeight: '20px',
})

export const helperTextColor = style({
  color: theme.colors.textColorGrey,
})
