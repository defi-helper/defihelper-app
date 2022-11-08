import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  borderRadius: 8,
  border: `1px solid ${theme.colors.common.red1}`,

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 5,
    },
  },
})

export const header = style({
  borderTopLeftRadius: 6,
  borderTopRightRadius: 6,
  background: theme.colors.common.red1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 8,
  gap: 32,
})
