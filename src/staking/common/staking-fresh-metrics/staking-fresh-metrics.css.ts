import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const freshMetricsIcon = style({
  color: theme.colors.textColorGreen,
  verticalAlign: 'middle',
})

export const freshMetricsDropdown = style({
  maxWidth: 253,
  padding: 16,
})

export const freshMetricsTitle = style({
  color: theme.colors.textColorGreen,
  marginBottom: 8,
})
