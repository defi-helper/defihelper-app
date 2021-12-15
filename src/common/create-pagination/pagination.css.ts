import { style } from '@vanilla-extract/css'
import { theme } from '../theme'

export const root = style({
  display: 'flex',
  alignItems: 'center',
})

export const item = style({
  width: 32,
  height: 32,
  margin: '0 3px',
  borderRadius: '50%',
  background: theme.colors.paper,
  verticalAlign: 'middle',
  textAlign: 'center',
})
