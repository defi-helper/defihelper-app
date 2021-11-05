import { style, globalStyle } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const input = style({
  marginBottom: 16,
})

export const wallet = style({})

globalStyle(`${wallet} > button`, {
  gap: 'unset',
})

export const walletTitle = style({
  width: '100%',
})

export const walletSubtitle = style({
  width: '100%',
  color: theme.colors.textColorGrey,
})
