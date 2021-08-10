import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  background: theme.colors.common.white,
})

export const input = style({
  marginBottom: 30,
})

export const label = style({
  color: theme.colors.common.black1,
})
