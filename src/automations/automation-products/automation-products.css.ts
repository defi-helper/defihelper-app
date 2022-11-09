import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  height: 420,
  width: 360,
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
})

export const title = style({
  color: theme.colors.textColorGreen,
  marginBottom: 16,
})

export const balance = style({
  color: theme.colors.common.pink1,
})

export const selectList = style({
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
})

export const selectListItem = style({
  background: theme.colors.tertiary,
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
})

export const selectListItemTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
})

export const buy = style({
  width: 120,
})
