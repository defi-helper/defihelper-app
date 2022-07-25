import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  width: 360,
  height: 536,
  padding: '24px 32px',
  display: 'flex',
  flexDirection: 'column',
})

export const title = style({
  color: theme.colors.textColorGreen,
  marginBottom: 16,
})

export const tabs = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  background: theme.colors.common.black13,
  marginBottom: 16,
  borderRadius: 8,
  padding: 2,
})

export const tabsItem = style({
  borderRadius: 6,
  padding: 6,
  textTransform: 'uppercase',
  color: theme.colors.textColorGrey,
})

export const tabsItemActive = style({
  background: theme.colors.common.green2,
  color: theme.colors.common.white1,
})
