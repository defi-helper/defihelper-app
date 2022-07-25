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

export const generatingTitle = style({
  marginBottom: 24,

  '@media': {
    [theme.mediaQueries.lg()]: {
      fontSize: 40,
    },
  },
})

export const cards = style({
  marginBottom: 24,
})

export const grid = style({
  display: 'grid',
  gap: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      gap: 24,
      gridTemplateColumns: '1fr 1fr',
    },
  },
})

export const mainChart = style({
  '@media': {
    [theme.mediaQueries.md()]: {
      gridColumnStart: 1,
      gridColumnEnd: 3,
    },
  },
})

export const section = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 64,
    },
  },
})

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const instructions = style({
  display: 'grid',
  gap: 16,
  marginBottom: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      gap: 24,
      gridTemplateColumns: '1fr 1fr 1fr',
      marginBottom: 24,
    },
  },
})

export const instructionCard = style({
  padding: 16,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  zIndex: 0,

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: 24,
    },
  },
})

export const green = style({
  color: theme.colors.textColorGreen,
})

export const instructionCardTitle = style([
  green,
  {
    marginBottom: 8,
  },
])

export const instructionCardText = style({
  marginBottom: 'auto',
})

export const instructionCardButton = style({
  marginTop: 16,
})

export const instructionCardIcon = style({
  position: 'absolute',
  right: 0,
  bottom: 0,
  opacity: 0.18,
  width: 147,
  height: 147,
  zIndex: -1,
})
