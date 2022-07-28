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

export const today = style({
  color: theme.colors.common.blue1,
})

export const changes = style({
  fontSize: 16,
})

export const positive = style({
  color: theme.colors.common.green2,
})

export const negative = style({
  color: theme.colors.common.red1,
})
