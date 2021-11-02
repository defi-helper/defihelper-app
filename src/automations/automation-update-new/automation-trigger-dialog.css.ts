import { style } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const root = style({})

export const tabs = style({
  display: 'flex',
  gap: 12,
})

export const tab = style({
  position: 'relative',
})

export const disableTab = style({
  color: theme.colors.textColorPrimary,
  opacity: 0.16,
  pointerEvents: 'none',
})

export const filledTab = style({
  opacity: 0.64,
})

export const activeTab = style({
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

export const input = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 24,
    },
  },
})

export const submit = style({
  width: '100%',
  marginTop: 'auto',
  minHeight: 42,
})
