import { style } from '@vanilla-extract/css'
import { theme } from '../theme'

export const root = style({
  position: 'fixed',
  top: 0,
  left: 0,
  minHeight: '100%',
  width: '100%',
  background: theme.colors.common.black5,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
})

export const content = style({
  color: theme.colors.textColorPrimary,
  maxHeight: '100vh',
  overflowY: 'auto',
  overflowX: 'hidden',
  border: `1px solid ${theme.colors.border}`,
})
