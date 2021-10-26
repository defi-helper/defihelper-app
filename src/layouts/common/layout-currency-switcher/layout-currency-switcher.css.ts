import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  padding: 4,
  border: `1px solid ${theme.colors.separator}`,
  borderRadius: 8,
})
