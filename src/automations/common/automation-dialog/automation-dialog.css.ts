import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  width: 360,
  height: 568,
  padding: '24px 32px',
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 24,
})

export const title = style({
  color: theme.colors.textColorGreen,
})

export const button = style({
  textTransform: 'uppercase',
  fontFamily: theme.fonts.mono,
  fontSize: 14,
  lineHeight: '20px',
  opacity: 0.4,
})
