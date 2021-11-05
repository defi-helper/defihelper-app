import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const input = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 24,
    },
  },
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

export const submit = style({
  width: '100%',
  marginTop: 'auto',
  minHeight: 42,
})
