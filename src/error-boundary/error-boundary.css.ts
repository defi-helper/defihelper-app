import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '50px 16px',
  height: '100%',
  alignItems: 'flex-start',

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: 48,
    },
  },
})

export const logo = style({
  marginBottom: 40,
})

export const content = style({
  '@media': {
    [theme.mediaQueries.md()]: {
      margin: 'auto 0',
    },
  },
})

export const title = style({
  marginBottom: 32,
  fontSize: 32,
  lineHeight: '32px',

  '@media': {
    [theme.mediaQueries.md()]: {
      marginBottom: 40,
      fontSize: 40,
      lineHeight: '48px',
    },
  },
})

export const subtitle = style({
  marginBottom: 40,

  '@media': {
    [theme.mediaQueries.md()]: {
      marginBottom: 24,
    },
  },
})

export const button = style({
  margin: '0 auto',

  '@media': {
    [theme.mediaQueries.md()]: {
      margin: 0,
    },
  },
})
