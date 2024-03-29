import { style, styleVariants, globalStyle } from '@vanilla-extract/css'
import { transitions } from 'polished'

import { theme } from '~/common/theme'

export const root = style({
  display: 'inline-flex',
  cursor: 'pointer',
  outline: 0,
  fontFamily: 'inherit',
  fontWeight: 'normal',
  textUnderlineOffset: 3,
  textDecorationColor: 'currentcolor',
  ...transitions('opacity 0.3s ease'),
})

export const underlines = styleVariants({
  none: {
    textDecorationLine: 'none',
  },

  always: {
    textDecorationLine: 'underline',
  },

  hover: {
    textDecorationLine: 'none',
  },
})

globalStyle(`${underlines.hover}:hover`, {
  '@media': {
    [theme.mediaQueries.hover()]: {
      textDecorationLine: 'underline',
    },
  },
})

export const colors = styleVariants({
  primary: {
    color: 'currentColor',
  },

  blue: {
    color: theme.colors.common.blue1,
  },
})
