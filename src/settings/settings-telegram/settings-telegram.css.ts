import { style } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const root = style({
  padding: '15px 12px 14px',
})

export const text = style({
  marginBottom: 30,
})

export const buttons = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 7,
})

export const button = style({
  paddingLeft: 0,
  paddingRight: 0,
})

export const blue = style({
  color: theme.colors.common.blue1,
})
