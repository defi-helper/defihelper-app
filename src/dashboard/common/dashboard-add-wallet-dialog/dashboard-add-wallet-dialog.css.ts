import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.white,
})

export const input = style({
  marginBottom: 30,
})

export const label = style({
  color: theme.palette.black1,
})
