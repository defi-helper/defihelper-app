import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  overflow: 'hidden',
})

export const heading = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 16,
})

export const icon = style({
  marginRight: 8,
  display: 'flex',
  alignItems: 'center',
})

export const platform = style({
  textTransform: 'capitalize',
})

export const header = style({
  padding: 24,
})

export const footer = style({
  padding: '16px 24px 24px',
  background: theme.colors.common.blue1,
  color: theme.colors.common.white1,
})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '40% 60%',

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 8,
    },
  },
})

export const infoTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
})

export const opacity = style({
  opacity: 0.64,
})

export const buttons = style({
  display: 'flex',
  gap: 12,
})

export const connect = style({
  background: theme.colors.common.white1,
  border: theme.colors.common.white1,
  color: theme.colors.common.black1,
})

export const disconnect = style({
  background: theme.colors.common.white3,
  border: theme.colors.common.white3,
  color: theme.colors.common.white1,
})
