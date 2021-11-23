import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const title = style({
  marginBottom: 16,

  '@media': {
    [theme.mediaQueries.lg()]: {
      marginBottom: 8,
    },
  },
})

export const grey = style({
  opacity: 0.64,
})

export const subtitle = style({
  margin: '0 auto 40px auto',
})

export const col = style({
  padding: '0 16px',
  width: '100%',

  '@media': {
    [theme.mediaQueries.lg()]: {
      width: '50%',
    },
  },

  selectors: {
    '&:first-child': {
      marginBottom: 16,

      '@media': {
        [theme.mediaQueries.lg()]: {
          marginBottom: 0,
        },
      },
    },
  },
})

export const card = style({
  minHeight: '100%',
  padding: 24,

  '@media': {
    [theme.mediaQueries.lg()]: {
      padding: '32px 40px',
    },
  },
})

export const cardTitle = style({
  marginBottom: 8,
})

export const cardSubtitle = style({
  marginBottom: 40,

  '@media': {
    [theme.mediaQueries.lg()]: {
      marginBottom: 48,
    },
  },
})

export const connected = style({
  background: theme.colors.background,
  color: theme.colors.textColorGreen,
  padding: '8px 16px',
  display: 'inline-flex',
  borderRadius: 8,
  marginRight: 8,
})
