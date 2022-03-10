import { style } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const card = style({
  padding: '10px 15px',
  margin: '10px 15px',
  display: 'flex',
  alignItems: 'center',
})

export const textBoxWrapper = style({
  textAlign: 'center',
  marginTop: 30,
})

export const link = style({
  color: theme.colors.common.blue1,
})
