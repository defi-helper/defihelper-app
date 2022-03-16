import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  padding: 30,
  maxWidth: 800,
  width: '100%',
})

export const videoWrap = style({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  paddingTop: '69.25%',
  borderRadius: 16,
  zIndex: 0,
  margin: '0 auto',
  marginBottom: 12,
})

export const video = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
})

export const checkbox = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: 8,
  position: 'relative',
  cursor: 'pointer',
  marginBottom: 12,

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

export const button = style({
  width: '100%',
})
