import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const header = style({
  display: 'none',
  alignItems: 'center',
  marginBottom: 40,

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'flex',
    },
  },
})

export const subtitle = style({
  marginBottom: 40,
  maxWidth: 895,
  fontSize: '20px',
  lineHeight: '28px',
})
