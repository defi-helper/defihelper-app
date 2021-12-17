import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  width: 360,
  height: 536,
  padding: '24px 32px',
  display: 'flex',
  flexDirection: 'column',
})

export const tabs = style({
  display: 'flex',
  gap: 18,
  marginBottom: 26,
})

export const title = style({
  color: theme.colors.textColorGreen,
})

export const description = style({
  marginBottom: 22,
})

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: 'calc(100% - 91px)',
})

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto',
})

export const button = style({
  marginTop: 'auto',
})

export const input = style({
  marginBottom: 16,
})

export const activeTab = style({
  position: 'relative',

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
