import { composeStyles, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  height: 420,
})

export const title = style({
  color: theme.colors.common.pink1,
})

export const balance = composeStyles(title, style({}))

export const selectList = style({
  minHeight: 'calc(100% - 65px)',
})

export const grey = style({
  color: theme.colors.textColorGrey,
})
