import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const dropdown = style({
  display: 'flex',
  flexDirection: 'column',
  padding: 16,
  border: `1px solid ${theme.colors.border}`,
  boxShadow: '0px 8px 24px rgba(10, 18, 19, 0.4)',
})
