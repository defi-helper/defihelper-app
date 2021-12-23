import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const header = style({
  alignItems: 'center',
  marginBottom: 28,
  display: 'none',
  width: '100%',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'flex',
    },
  },
})

export const icon = style({
  verticalAlign: 'middle',
  marginRight: 12,
  width: 24,
  height: 24,

  '@media': {
    [theme.mediaQueries.md()]: {
      width: 36,
      height: 36,
    },
  },
})

export const protocolLink = style({
  padding: 4,
  marginLeft: 'auto',
  color: theme.colors.textColorGrey,

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '8px 16px',
    },
  },
})

export const mb120 = style({
  marginBottom: 120,
})

export const grid = style({
  display: 'grid',

  '@media': {
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 24,
    },
  },
})

export const carousel = style({
  marginLeft: -16,
  marginRight: -16,
})

export const grey = style({
  color: theme.colors.textColorGrey,
  marginBottom: 'auto',
})

export const lightGreen = style({
  color: theme.colors.common.green1,
})

export const green = style({
  color: theme.colors.common.green2,
})

export const red = style({
  color: theme.colors.common.red1,
})

export const card = style({
  padding: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '24px 32px',
    },
  },
})

export const subtitle = style({
  marginBottom: 24,
})

export const flex = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

export const tabs = style({
  marginBottom: 32,

  '@media': {
    [theme.mediaQueries.md()]: {
      marginBottom: 64,
    },
  },
})

export const tab = style({
  borderRadius: 8,
  padding: '8px 16px',
  fontSize: 20,
  lineHeight: '28px',
  opacity: 0.64,
})

export const tabActive = style({
  backgroundColor: theme.colors.paper,
  opacity: 1,
})

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const automates = style({
  marginBottom: 53,
})
