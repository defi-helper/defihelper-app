import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  background: theme.colors.common.white1,
  color: theme.colors.common.black1,
  padding: 20,
  borderRadius: 4,
  maxWidth: 357,
})

export const content = style({
  marginBottom: 10,
})
