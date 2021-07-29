import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  paddingTop: 40,

  '@media': {
    [theme.mediaQueries.lg()]: {
      paddingTop: 64,
    },
  },
})

export const title = style({
  marginBottom: 16,

  '@media': {
    [theme.mediaQueries.lg()]: {
      marginBottom: 8,
      textAlign: 'center',
    },
  },
})

export const grey = style({
  color: theme.palette.grey1,
})

export const subtitle = style({
  margin: '0 auto 40px auto',

  '@media': {
    [theme.mediaQueries.lg()]: {
      textAlign: 'center',
      maxWidth: 640,
    },
  },
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
