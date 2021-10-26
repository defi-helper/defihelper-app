import { style } from '@vanilla-extract/css'

import { theme } from '../theme'

export const root = style({
  maxWidth: '100%',
})

export const tabList = style({
  display: 'flex',
})

export const tabPanes = style({
  width: '100%',
})

export const tab = style({
  borderRadius: 8,
  padding: '8px 16px',
  fontSize: 20,
  lineHeight: '28px',
  opacity: 0.64,
})

export const tabActive = style({
  backgroundColor: theme.colors.paper,
  opacity: 1,
})

export const tabPane = style({
  width: '100%',
})
