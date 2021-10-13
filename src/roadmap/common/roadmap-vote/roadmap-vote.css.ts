import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  borderRadius: 100,
  border: `1px solid ${theme.colors.common.green1}`,
  color: theme.colors.common.green1,
  padding: '6px 12px',
})

export const icon = style({
  width: '30%',
})

export const title = style({
  width: '70%',
  paddingLeft: 8,
})

export const voted = style({
  background: theme.colors.common.green1,
  color: theme.colors.common.black1,
})
