import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  width: 360,
  height: 568,
  padding: '32px 24px 24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

export const header = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: 24,
  width: '100%',
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
