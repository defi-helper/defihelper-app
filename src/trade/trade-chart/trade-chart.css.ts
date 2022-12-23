import { style, globalStyle } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  position: 'relative',
})

export const chart = style({
  position: 'absolute',
  overflow: 'hidden',
  width: '100%',
  paddingTop: '56.25%',
  zIndex: 0,
  height: '100%',
})

export const copyright = style({
  bottom: 0,
  right: 0,
  width: 226,
  borderTopLeftRadius: 8,
  display: 'flex',
  gap: 9,
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 12,
  lineHeight: '16px',
  color: theme.colors.textColorGrey,
  padding: '13px 0',
  marginLeft: 'auto',
})

export const copyrightIcon = style({
  width: 123,
  height: 21,
})

globalStyle(`${root} iframe`, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
})

export const loader = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  minHeight: 300,
})
