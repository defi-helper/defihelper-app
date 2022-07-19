import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const section = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 45,

      '@media': {
        [theme.mediaQueries.md()]: {
          marginBottom: 72,
        },
      },
    },
  },
})

export const title = style({
  marginBottom: 32,
})

export const header = style([
  section,
  {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 32,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
])

export const countDesktop = style({
  marginLeft: 'auto',
  alignItems: 'center',
  padding: '0 12px',
  display: 'none',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'flex',
    },
  },
})

export const countMobile = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: 4,
  marginLeft: 'auto',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'none',
    },
  },
})

export const countTitle = style({
  fontSize: 12,
  lineHeight: '16px',
})

export const left = style({
  display: 'none',
  marginLeft: 6,

  '@media': {
    [theme.mediaQueries.lg()]: {
      display: 'inline',
    },
  },
})
