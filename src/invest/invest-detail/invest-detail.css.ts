import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  height: '100%',
  padding: '8px 16px 25px',
  width: '100%',
  maxWidth: 1920,
  margin: '0 auto',

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '24px 48px',
    },
  },
})

export const inner = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
})

export const header = style({
  display: 'flex',
  gap: 10,
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: 8,

  '@media': {
    [theme.mediaQueries.sm()]: {
      paddingBottom: 24,
    },
  },
})

export const title = style({
  display: 'flex',
  gap: 12,
  alignItems: 'center',
})

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: 24,
})

export const wallet = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})

export const backToMain = style({
  fontSize: 16,
  lineHeight: '24px',

  '@media': {
    [theme.mediaQueries.md()]: {
      background: theme.colors.paper,
      color: theme.colors.textColorGrey,
      padding: '8px 16px',
      borderRadius: 8,
    },
  },
})

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 0 auto',
  width: '100%',

  '@media': {
    [theme.mediaQueries.sm()]: {
      width: 396,
      margin: '0 auto',
    },
  },
})

export const contractInfo = style({
  margin: 'auto 0',

  '@media': {
    [theme.mediaQueries.sm()]: {
      marginTop: 72,
      marginBottom: 88,
    },
  },
})

export const loader = style([
  contractInfo,
  {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
])
