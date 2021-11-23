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

export const logo = style({
  margin: '0 auto 64px',
})

export const logoIcon = style({
  display: 'block',
  width: '100%',
})
