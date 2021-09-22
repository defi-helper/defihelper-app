import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  padding: 3,
  border: `1px solid ${theme.colors.separator}`,
  borderRadius: 8,
  display: 'inline-flex',
})

export const icon = style({
  width: 24,
  height: 24,
})

export const button = style({
  opacity: 0.64,
  width: 45,
  height: 26,
  borderRadius: 6,
})

export const active = style({
  opacity: 1,
  background: theme.colors.paper,
})
