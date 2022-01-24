import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  width: 460,
  padding: '24px 32px',
})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  padding: '16px 24px',

  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.colors.border}`,
    },
  },
})
