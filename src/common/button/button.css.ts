import { styleVariants, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  borderRadius: 8,
  textTransform: 'uppercase',
  fontFamily: theme.fonts.mono,
  padding: '7px 15px',
  position: 'relative',
})

export const colors = styleVariants({
  primary: {
    background: theme.colors.primary,
    border: `1px solid ${theme.colors.primary}`,
    color: theme.colors.textColorSecondary,
  },

  secondary: {
    background: theme.colors.secondary,
    color: theme.colors.common.black1,
    border: `1px solid ${theme.colors.secondary}`,
  },

  green: {
    background: theme.colors.common.green1,
    color: theme.colors.common.black1,
    border: `1px solid ${theme.colors.common.green1}`,
  },

  blue: {
    background: theme.colors.common.blue,
    color: theme.colors.common.white1,
    border: `1px solid ${theme.colors.common.blue}`,
  },
})

export const varinats = styleVariants({
  contained: {},

  outlined: {
    backgroundColor: 'transparent',

    selectors: {
      [`&.${colors.primary}`]: {
        color: theme.colors.textColorPrimary,
      },

      [`&.${colors.secondary}`]: {
        color: theme.colors.secondary,
      },

      [`&.${colors.green}`]: {},

      [`&.${colors.blue}`]: {},
    },
  },
})

export const sizes = styleVariants({
  small: {},

  medium: {},

  large: {},
})

export const loading = style({
  pointerEvents: 'none',
})

export const circularProgess = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: 'auto',
})

export const content = style({
  transition: 'opacity .4s ease-in-out',
})

export const contentLoading = style({
  opacity: 0,
})
