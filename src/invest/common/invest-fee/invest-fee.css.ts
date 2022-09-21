import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const serviceFee = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
  marginBottom: 16,
})

export const serviceFeeTitle = style({
  color: theme.colors.textColorGrey,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
})

export const serviceFeeDropdown = style({
  width: 252,
  zIndex: 1001,
  padding: 16,
})
