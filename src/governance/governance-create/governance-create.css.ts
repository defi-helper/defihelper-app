import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '64px 0',
  maxWidth: 800,
  margin: 'auto',
})

export const input = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 16,
    },
  },
})

export const actions = style({
  padding: 32,
})

export const action = style({
  paddingBottom: 24,
})

export const actionTitle = style({
  wordBreak: 'break-word',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

export const actionButton = style({
  opacity: 0.64,

  selectors: {
    '&:not(:last-child)': {
      marginRight: 8,
    },
  },
})

export const error = style({
  color: theme.colors.common.red1,
})

export const submit = style({
  margin: '0 auto',
})
