import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  height: 397,
  width: 435,
})

export const title = style({
  marginTop: 'auto',
  padding: '0 24px',

  '@media': {
    [theme.mediaQueries.md()]: {
      fontSize: 20,
      lineHeight: '28px',
      padding: '0 48px',
    },
  },
})

export const img = style({
  marginTop: 'auto',
  maxWidth: '100%',
  padding: '0 20px',

  '@media': {
    [theme.mediaQueries.md()]: {
      fontSize: 20,
      lineHeight: '28px',
      padding: '0 40px',
    },
  },
})
