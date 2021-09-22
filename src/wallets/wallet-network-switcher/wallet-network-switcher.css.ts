import { style, globalStyle } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  position: 'relative',
  paddingBottom: 8,
})

export const hided = style({
  pointerEvents: 'none',
})

export const account = style({
  padding: '9px 25px 9px 16px',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
})

export const accountHided = style({
  padding: 0,
  justifyContent: 'center',
})

globalStyle(`${root}:hover ${account}`, {
  background: theme.colors.paper,
})

export const dropdown = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  display: 'none',
  flexDirection: 'column',
  zIndex: 100,
  border: `1px solid ${theme.colors.border}`,
})

globalStyle(`${root}:hover ${dropdown}`, {
  display: 'flex',
})

export const dropdownItem = style({
  fontFamily: `${theme.fonts.mono}`,
  textTransform: 'uppercase',
  justifyContent: 'flex-start',
  padding: '8px 16px',
  textAlign: 'left',
})

export const changeNetwork = style({
  borderBottom: `1px solid ${theme.colors.border}`,
})

export const networkIcon = style({
  width: 22,
  height: 22,
  marginRight: 8,
})

export const networkIconHided = style({
  marginRight: 0,
})

export const arrowTop = style({
  opacity: 0.64,
  width: 8,
  height: 4,
  marginLeft: 'auto',
  transform: 'rotate(180deg)',
})

globalStyle(`${root}:hover ${arrowTop}`, {
  transform: 'none',
})

export const checked = style({
  width: 12,
  height: 8,
  marginLeft: 'auto',
})

export const connectWallet = style({
  width: '100%',
  paddingLeft: 0,
  paddingRight: 0,
})
