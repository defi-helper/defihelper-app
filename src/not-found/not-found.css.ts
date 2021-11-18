import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: 'calc(100vh - 82px)',
  maxWidth: 695,

  '@media': {
    [theme.mediaQueries.md()]: {
      height: 'calc(100vh - 56px)',
    },
  },
})

export const sup = style({
  color: theme.colors.common.blue1,
})

export const subtitle = style({
  marginBottom: 25,
  maxWidth: 600,
})

export const actions = style({
  display: 'flex',
  gap: 10,
})
