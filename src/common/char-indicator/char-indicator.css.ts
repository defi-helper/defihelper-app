import { style, styleVariants } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 5,
  padding: 5,
  width: 15,
  height: 15,
  fontSize: 12,
})

export const colors = styleVariants({
  green: {
    background: theme.colors.textColorGreen,
  },

  red: {
    background: theme.colors.common.red1,
  },
})
