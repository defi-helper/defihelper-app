import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
})

export const button = style({
  borderRadius: 6,
  width: 32,
  height: 32,
  border: `1px solid ${theme.colors.border}`,
})
