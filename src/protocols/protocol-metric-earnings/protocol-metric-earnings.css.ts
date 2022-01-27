import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 24,
})

export const title = style({})

export const charts = style({
  display: 'grid',
  gap: 16,
  marginBottom: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: '1fr 1fr',
      gap: 24,
      marginBottom: 24,
    },
  },
})

export const label = style({
  marginLeft: 'auto',
  color: theme.colors.textColorGrey,
})

export const link = style({
  color: theme.colors.common.blue1,
})
export const eastimatedTitle = style({
  display: 'flex',
  alignItems: 'center',
})

export const question = style({
  verticalAlign: 'middle',
  marginLeft: 10,
})
