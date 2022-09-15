import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  padding: 8,
  background: theme.colors.common.green1,
  marginLeft: -8,
  marginRight: -8,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  color: theme.colors.common.black1,
})

export const text = style({
  marginBottom: 16,
  fontSize: 12,
})

export const buttons = style({
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  alignItems: 'center',
  justifyContent: 'center',
})

export const button = style({
  fontSize: 12,
  padding: '6px 12px',
  color: theme.colors.common.white1,
  background: theme.colors.common.black1,
  maxWidth: 182,
  width: '100%',
})

export const notification = style({
  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  maxWidth: '100%',
  marginBottom: 16,
})
