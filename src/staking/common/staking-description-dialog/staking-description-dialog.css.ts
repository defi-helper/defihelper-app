import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const content = style({
  overflowX: 'hidden',
  overflowY: 'auto',
  marginBottom: 24,
})

export const note = style({
  color: theme.colors.common.pink3,
})

export const checkbox = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: 8,
  position: 'relative',
  marginBottom: 12,
  cursor: 'pointer',

  ':before': {
    content: '""',
    borderRadius: 8,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    backgroundColor: theme.colors.textColorPrimary,
    opacity: 0.08,
  },
})

globalStyle(`${content} > *:not(:last-child)`, {
  marginBottom: 36,
})
