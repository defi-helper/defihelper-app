import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const dropdownItem = style({
  fontFamily: `${theme.fonts.mono} !important`,
  textTransform: 'uppercase',
})
