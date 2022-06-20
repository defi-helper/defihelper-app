import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const title = style({
  marginBottom: 28,
  display: 'none',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'block',
    },
  },
})

export const content = style({
  display: 'grid',
  gridTemplateColumns: '1fr 352px',
  gap: 24,
})

export const select = style({
  marginBottom: 12,
})

export const selects = style([
  select,
  {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24,
  },
])

export const chart = style({})

export const chartInner = style({
  width: '100%',
  height: 570,
})
