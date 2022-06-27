import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  display: 'flex',
  border: `1px solid ${theme.colors.border}`,
  borderRadius: 6,
  overflow: 'hidden',
})

export const item = style({
  flexGrow: 1,
  padding: 2,
})

export const itemActive = style({
  background: theme.colors.border,
})
