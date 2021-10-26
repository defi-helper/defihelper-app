import { style } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const root = style({})

export const title = style({
  marginBottom: 24,
  display: 'flex',
  justifyContent: 'space-between',
})

export const charts = style({
  display: 'grid',
  gap: 16,
  marginBottom: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: '1fr 1fr',
      gap: 24,
      marginBottom: 24,
    },
  },
})

export const chart = style({
  padding: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '24px 32px',
    },
  },
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 32,
})

export const select = style({
  padding: '8px 16px',
  background: theme.colors.paper,
  color: theme.colors.textColorGrey,
  borderRadius: 8,
})

export const selectArrow = style({
  width: 16,
  height: 16,
  marginLeft: 4,
})
