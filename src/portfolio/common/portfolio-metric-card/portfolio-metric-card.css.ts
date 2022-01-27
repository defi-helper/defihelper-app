import { style, globalStyle } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  width: '100%',
  padding: 32,
})

globalStyle(`${root} *:not(:last-child)`, {
  marginBottom: 4,
})

export const title = style({
  color: theme.colors.textColorGrey,
  display: 'flex',
  alignItems: 'center',
})
