import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const button = style({
  flexDirection: 'column',
})

export const description = style({
  color: theme.colors.textColorGrey,
})
