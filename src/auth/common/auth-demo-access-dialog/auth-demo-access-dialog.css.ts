import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  padding: 32,
  maxWidth: 460,
  width: '100%',
})

export const buttonGroup = style({
  display: 'grid',
  justifyContent: 'center',
})

export const stayInSimulation = style({
  marginBottom: 24,
})

export const title = style({
  marginBottom: 24,
  color: theme.colors.textColorGreen,
})

export const body = style({
  marginBottom: 64,
})
