import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const dropdown = style({
  zIndex: 1000,
  maxHeight: 400,
  overflowX: 'hidden',
  overflowY: 'auto',
})

export const option = style({
  justifyContent: 'flex-start',
})

export const active = style({
  opacity: 0.4,
  pointerEvents: 'none',
})

export const error = style({})

export const input = style({
  display: 'flex',
  alignItems: 'center',
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
  minHeight: 42,

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

export const disabled = style({
  pointerEvents: 'none',
  opacity: 0.8,
})

export const label = style({
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
