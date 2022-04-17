import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  padding: '15px 7px',
  background: theme.colors.common.green1,
  marginLeft: -8,
  marginRight: -8,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  color: theme.colors.common.black1,
})

export const close = style({
  position: 'absolute',
  right: -5,
  top: -5,
  width: 10,
  height: 10,
  borderRadius: '50%',
  background: theme.colors.textColorPrimary,
  color: theme.colors.textColorSecondary,
})

export const text = style({
  marginBottom: 14,
  fontSize: 13,
})

export const buttons = style({
  margin: 'auto',
})

export const button = style({
  fontSize: 12,
  padding: '6px 12px',
  color: theme.colors.common.white1,
  background: theme.colors.common.black1,
})

export const alert = style({
  filter: `drop-shadow(0px 4px 4px ${theme.colors.common.black5})`,
  background: theme.colors.common.grey4,
  borderRadius: 9,
  padding: '9px 10px 12px 8.5px',
  marginBottom: 14,
})

export const alertHeader = style({
  display: 'flex',
  gap: 5,
  alignItems: 'center',
  marginBottom: 6,
})

export const alertIcon = style({
  background: theme.colors.common.black1,
  color: theme.colors.common.white1,
  width: 15,
  height: 15,
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const alertTitle = style({
  fontSize: 10,
})

export const alertTime = style({
  marginLeft: 'auto',
  fontSize: 11,
  color: theme.colors.common.black9,
})

export const alertSubtitle = style({
  marginBottom: 4,
  fontSize: 11,
})

export const alertText = style({
  fontSize: 9,
})
