import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  borderRadius: 100,
  border: `1px solid ${theme.colors.textColorGreen}`,
  color: theme.colors.textColorGreen,
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
  background: theme.colors.textColorGreen,
  color: theme.colors.common.black1,
})
