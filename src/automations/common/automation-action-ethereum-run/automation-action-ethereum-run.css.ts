import { style, globalStyle } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const input = style({
  marginBottom: 16,
})

export const contractButton = style({})

globalStyle(`${contractButton} button`, {
  gap: 'unset',
})

export const protocol = style({
  color: theme.colors.textColorGrey,
  width: '100%',
})
