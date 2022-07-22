import { style } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const root = style({
  width: 352,
  padding: '24px 32px 32px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const title = style({
  marginBottom: 16,
  fontSize: 16,
  lineHeight: '24px',
})

export const description = style({
  color: theme.colors.common.red1,
  fontSize: 14,
  lineHeight: '20px',
  marginBottom: 16,
  fontFamily: theme.fonts.mono,
})

export const actions = style({
  width: '100%',
})
