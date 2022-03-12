import { styleVariants, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  borderRadius: 8,
  textTransform: 'uppercase',
  fontFamily: theme.fonts.mono,
  padding: '7px 15px',
  position: 'relative',
  verticalAlign: 'middle',
  overflow: 'hidden',
  transitionProperty: 'transform,opacity',
  transitionDuration: '.2s',
  transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',

  ':active': {
    transform: 'scale(.95)',
  },
})

export const colors = styleVariants({
  primary: {
    background: theme.colors.primary,
    border: `1px solid ${theme.colors.primaryButtonBorder}`,
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
    background: theme.colors.common.blue1,
    color: theme.colors.common.white1,
    border: `1px solid ${theme.colors.common.blue1}`,
  },

  pink: {},

  lime: {},

  red: {
    background: theme.colors.common.red1,
    border: `1px solid ${theme.colors.common.red1}`,
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

      [`&.${colors.green}`]: {
        color: theme.colors.secondary,
      },

      [`&.${colors.blue}`]: {
        color: theme.colors.common.blue1,
      },

      [`&.${colors.red}`]: {
        color: theme.colors.common.red1,
      },
    },
  },

  light: {
    selectors: {
      [`&.${colors.green}`]: {
        color: theme.colors.common.green2,
        background: theme.colors.common.green4,
        borderColor: 'transparent',
      },

      [`&.${colors.blue}`]: {
        color: theme.colors.common.blue1,
        background: theme.colors.common.blue2,
        borderColor: 'transparent',
      },

      [`&.${colors.pink}`]: {
        color: theme.colors.common.pink3,
        background: theme.colors.common.pink2,
        borderColor: 'transparent',
      },

      [`&.${colors.lime}`]: {
        color: theme.colors.common.green1,
        background: theme.colors.common.green3,
        borderColor: 'transparent',
      },

      [`&.${colors.red}`]: {
        color: theme.colors.common.red1,
        background: theme.colors.common.red2,
        borderColor: 'transparent',
      },
    },
  },
})

export const sizes = styleVariants({
  small: {
    fontSize: 14,
    lineHeight: '20px',
    padding: '6px 12px',
  },

  medium: {
    fontSize: 16,
    lineHeight: '24px',
    padding: '8px 16px',
  },

  large: {
    fontSize: 20,
    lineHeight: '28px',
    padding: '12px 20px',
  },
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
  display: 'flex',
})

export const contentLoading = style({
  opacity: 0,
})
