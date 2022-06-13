import { globalStyle } from '@vanilla-extract/css'

import { theme } from './common/theme'

globalStyle('*,*:before,*:after', {
  boxSizing: 'border-box',
})

globalStyle('html, body, #root', {
  height: '100%',
})

globalStyle('body', {
  fontFamily: theme.fonts.square,
  fontSize: '100%',
  background: theme.colors.background,
  color: theme.colors.textColorPrimary,
})
