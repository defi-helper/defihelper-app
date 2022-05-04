import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  background: theme.colors.common.green1,
  color: theme.colors.common.black1,
  padding: 20,
  borderRadius: 4,
  maxWidth: 357,
  position: 'relative',
})

export const content = style({
  marginBottom: 40,
})

export const close = style({
  position: 'absolute',
  right: -5,
  top: -5,
  width: 10,
  height: 10,
  borderRadius: '50%',
  background: theme.colors.textColorPrimary,
  color: theme.colors.textColorSecondary,
})

export const buttons = style({})

globalStyle(`${buttons} *`, {
  color: theme.colors.common.black1,
  borderColor: theme.colors.common.black1,
})
