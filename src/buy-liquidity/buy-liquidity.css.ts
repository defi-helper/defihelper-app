import { style } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const header = style({
  display: 'none',
  alignItems: 'center',
  gap: 8,
  marginBottom: 32,

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'flex',
    },
  },
})

export const headerIcon = style({
  width: 36,
  height: 36,
})

export const subtitle = style({
  marginBottom: 19,

  '@media': {
    [theme.mediaQueries.md()]: {
      marginBottom: 32,
    },
  },
})

export const instruction = style({
  display: 'grid',
  gap: 8,
  marginBottom: 48,

  '@media': {
    [theme.mediaQueries.md()]: {
      gap: 24,
      gridTemplateColumns: '1fr 1fr 1fr',
      marginBottom: 40,
    },
  },
})

export const instructionCard = style({
  padding: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '24px 24px 32px',
    },
  },
})

export const instructionCardTitle = style({
  marginBottom: 8,
  color: theme.colors.textColorGreen,
  minHeight: 48,

  '@media': {
    [theme.mediaQueries.md()]: {
      minHeight: 56,
    },
  },
})

export const selects = style({
  display: 'grid',
  gap: 8,
  marginBottom: 64,

  '@media': {
    [theme.mediaQueries.md()]: {
      marginBottom: 32,
      gap: 16,
      gridTemplateColumns: '296px 296px',
    },
  },
})

export const select = style({})

export const apply = style({
  justifyContent: 'center',
})
