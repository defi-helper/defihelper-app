import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const loader = style({
  display: 'flex',
  gap: 4,
})

export const loaderItem = style({
  width: 16,
  height: 24,
  border: `1px solid ${theme.colors.common.blue1}`,
})

export const loaderItemActive = style({
  background: theme.colors.common.blue1,
})
