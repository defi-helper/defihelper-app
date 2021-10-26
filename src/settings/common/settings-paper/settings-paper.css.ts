import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  background: 'none',
  border: `1px solid ${theme.colors.paper}`,
  display: 'none',

  '@media': {
    [theme.mediaQueries.up(1374)]: {
      display: 'block',
    },
  },
})
