import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  position: 'relative',
  maxWidth: 286,
})

export const rail = style({
  backgroundColor: theme.colors.border,
  height: 6,
  width: '100%',
})

export const track = style({
  height: 6,
  width: '100%',
})

export const trackNormal = style({
  backgroundColor: theme.colors.common.green2,
})

export const trackReverse = style({
  backgroundColor: theme.colors.common.red1,
})
