import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  background: 'none',
  border: `1px solid ${theme.colors.paper}`,
})
