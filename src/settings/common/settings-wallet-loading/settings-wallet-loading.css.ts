import { style } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 32px',
})

export const icon = style({
  width: 94,
  height: 52,
  color: theme.colors.common.pink4,
  margin: 'auto',
})
