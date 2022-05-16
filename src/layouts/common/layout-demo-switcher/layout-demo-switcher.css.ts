import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  padding: '8.5px 16px',
  border: `1px solid ${theme.colors.separator}`,
  borderRadius: 8,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
})
