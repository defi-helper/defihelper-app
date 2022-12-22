import { style, globalStyle } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const root = style({
  position: 'relative',
})

export const chart = style({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  paddingTop: '56.25%',
  zIndex: 0,
  height: '100%',
})

export const copyright = style({
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: 190,
  background: theme.colors.paper,
  borderTopLeftRadius: 8,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const copyrightIcon = style({
  width: 140,
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
