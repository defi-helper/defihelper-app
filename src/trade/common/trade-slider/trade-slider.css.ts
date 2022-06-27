import { style, globalStyle } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

globalStyle(`${root} .rc-slider-rail`, {
  background: theme.colors.border,
  borderRadius: 2,
  height: 4,
})

globalStyle(`${root} .rc-slider-track`, {
  borderRadius: 2,
  height: 4,
  backgroundColor: theme.colors.common.green2,
})

export const reverse = style({})

globalStyle(`${reverse} .rc-slider-track`, {
  backgroundColor: theme.colors.common.red1,
})

globalStyle(`${root} .rc-slider-handle`, {
  width: 16,
  height: 16,
  background: theme.colors.common.white1,
  border: '1px solid rgba(0, 0, 0, 0.15)',
  boxShadow: 'none',
  borderRadius: 18,
  opacity: 1,
  marginTop: -7,
})

globalStyle(`${root} .rc-slider-handle:active`, {
  boxShadow: 'none',
})
