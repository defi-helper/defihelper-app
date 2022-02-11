import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  marginLeft: 'auto',
  color: theme.colors.textColorGrey,
})
