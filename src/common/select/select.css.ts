import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const dropdown = style({
  padding: 0,
  zIndex: 1000,
})

export const dropdownInner = style({
  maxHeight: 400,
  overflowX: 'hidden',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  padding: 16,
})

export const option = style({
  justifyContent: 'flex-start',

  '@media': {
    [theme.mediaQueries.hover()]: {
      ':hover': {
        color: theme.colors.textColorGreen,
        opacity: 1,
      },
    },
  },

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 8,
    },
  },
})

export const active = style({})

export const error = style({})

export const checkbox = style({
  marginLeft: 'auto',
})

export const input = style({
  display: 'flex',
  alignItems: 'center',
  width: 'inherit',
  height: 'inherit',
  outline: 'none',
  border: `1px solid ${theme.colors.border}`,
  textTransform: 'inherit',
  fontFamily: theme.fonts.square,
  backgroundColor: theme.colors.paper,
  borderRadius: 8,
  fontSize: 16,
  lineHeight: '24px',
  padding: '8px 16px',
  color: 'currentcolor',
  transition: 'border .2s ease-in-out',
  minHeight: 42,
  paddingRight: 40,
  position: 'relative',

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

export const inputInner = style({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  maxWidth: '100%',
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

export const icon = style({
  position: 'absolute',
  right: 16,
  top: 0,
  bottom: 0,
  margin: 'auto',
  background: theme.colors.paper,
})
