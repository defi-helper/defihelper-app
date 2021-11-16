import { style, styleVariants } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  color: theme.colors.textColorPrimary,
  padding: '6px 6px 6px 16px',
  borderRadius: 4,
  boxShadow:
    '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)',
  display: 'flex',
  alignItems: 'center',
  minHeight: 0,
})

export const variants = styleVariants({
  default: {
    background: theme.colors.paper,
  },

  info: {
    background: theme.colors.common.blue1,
  },

  success: {
    background: theme.colors.common.green,
  },

  warning: {
    background: theme.colors.common.yellow,
  },

  error: {
    background: theme.colors.common.red1,
  },
})

export const text = style({
  marginRight: 10,
})

export const button = style({
  width: 28,
  height: 28,
  marginLeft: 'auto',

  '@media': {
    [theme.mediaQueries.hover()]: {
      ':hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
  },
})
