import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const tabs = style({
  display: 'flex',
  gap: 12,
})

export const tab = style({
  position: 'relative',
  opacity: 0.64,
})

export const disableTab = style({
  color: theme.colors.textColorPrimary,
  opacity: 0.16,
  pointerEvents: 'none',
})

export const activeTab = style({
  opacity: 1,
  color: 'inherit',

  ':after': {
    content: '""',
    position: 'absolute',
    bottom: -6,
    left: -6,
    right: -6,
    height: 1,
    background: 'currentcolor',
  },
})

export const addButton = style({
  color: theme.colors.textColorGrey,
  textTransform: 'uppercase',
  fontSize: 14,
  lineHeight: '20px',
  fontFamily: theme.fonts.mono,
})

export const item = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 24,
    },

    '&:nth-last-child(2)': {
      marginBottom: 36,
    },
  },
})

globalStyle(`${item} button`, {
  gap: 'unset',
})

export const itemTitle = style({
  width: '100%',
})

export const itemSubtitle = style({
  width: '100%',
  color: theme.colors.textColorGrey,
})
