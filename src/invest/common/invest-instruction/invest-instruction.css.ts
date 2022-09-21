import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

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
      padding: '24px 24px 16px',
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

export const instructionCardText = style({
  marginBottom: 16,
})
