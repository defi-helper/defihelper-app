import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  color: theme.colors.textColorGrey,
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  listStyle: 'none',
})

export const separator = style({
  marginLeft: 8,
  marginRight: 8,
})

export const last = style({
  color: theme.colors.textColorPrimary,
})
