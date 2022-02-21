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

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const edit = style({
  marginLeft: 10,
})

export const copyright = style({
  color: theme.colors.textColorGrey,
  marginTop: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
})

export const copyrightLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  marginLeft: 4,
})

export const copyrightIcon = style({
  marginRight: 4,
})
