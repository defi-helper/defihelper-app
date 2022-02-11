import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const label = style({
  marginLeft: 'auto',
  color: theme.colors.textColorGrey,
})

export const link = style({
  color: theme.colors.common.blue1,
})
export const eastimatedTitle = style({
  display: 'flex',
  alignItems: 'center',
})

export const question = style({
  verticalAlign: 'middle',
  marginLeft: 10,
})
