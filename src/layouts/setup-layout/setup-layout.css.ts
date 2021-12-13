import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const title = style({
  fontSize: 48,
  lineHeight: '56px',
  marginBottom: 8,
})

export const subtitle = style({
  color: theme.colors.textColorGrey,
  maxWidth: 728,
  marginBottom: 48,
})

export const list = style({
  gap: 24,
  display: 'grid',

  '@media': {
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(351px, 1fr))',
    },
  },
})

export const connect = style({
  minHeight: 324,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.colors.paper}`,
})

export const paper = style({
  background: 'none',
  border: `1px solid ${theme.colors.paper}`,

  selectors: {
    '&:nth-child(2)': {
      display: 'none',

      '@media': {
        [theme.mediaQueries.up(999)]: {
          display: 'block',
        },
      },
    },

    '&:last-child': {
      display: 'none',

      '@media': {
        [theme.mediaQueries.up(1374)]: {
          display: 'block',
        },
      },
    },
  },
})
