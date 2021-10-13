import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  width: 352,
  height: 244,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '24px 32px',
})

export const title = style({
  marginBottom: 8,
})

export const subtitle = style({
  marginBottom: 10,
  color: theme.colors.textColorGrey,
})

export const button = style({
  marginTop: 'auto',
})
