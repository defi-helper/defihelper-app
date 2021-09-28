import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  borderRadius: 8,
  padding: 2,
})

export const tab = style({
  padding: '6px 8px',
  fontSize: 16,
  lineHeight: '24px',
  borderRadius: 6,
  color: theme.colors.textColorGrey,

  selectors: {
    '&:not(:last-child)': {
      marginRight: 8,
    },
  },
})

export const active = style({
  background: theme.colors.common.green2,
  color: theme.colors.textColorPrimary,
})
