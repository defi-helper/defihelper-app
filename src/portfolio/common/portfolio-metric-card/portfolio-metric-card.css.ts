import { style, styleVariants, globalStyle } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  width: '100%',
  padding: 32,
})

globalStyle(`${root} *:not(:last-child)`, {
  marginBottom: 4,
})

export const title = style({
  color: theme.colors.textColorGrey,
})

export const variant = styleVariants({
  positive: {
    color: theme.colors.common.green2,
  },

  negative: {
    color: theme.colors.common.red1,
  },
})

export const time = style({
  color: theme.colors.common.blue1,
})
