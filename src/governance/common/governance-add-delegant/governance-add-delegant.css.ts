import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
})

export const input = style({
  margin: 'auto 0',
})

export const error = style({
  color: theme.colors.common.red1,
})
