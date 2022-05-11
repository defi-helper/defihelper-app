import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '36px 32px 27px',
})

export const imgWrap = style({
  maxWidth: 406,
  height: 359,
  margin: '0 auto 70px',
})

export const img = style({
  maxWidth: '100%',
})

export const green = style({
  color: theme.colors.textColorGreen,
})
