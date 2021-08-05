import { globalStyle } from '@vanilla-extract/css'

import { theme } from './common/theme'

globalStyle('*,*:before,*:after', {
  boxSizing: 'border-box',
})

globalStyle('body', {
  fontFamily: theme.fonts.square,
  fontSize: '100%',
  background: theme.color.background,
  color: theme.color.textColor,
})
