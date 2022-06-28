import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  minHeight: 172,
  padding: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '24px 32px',
      minHeight: 196,
    },
  },
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
})

export const proposalTitle = style({
  textDecoration: 'none',
  width: 'calc(100% - 20px)',
  display: 'inline-block',
  wordBreak: 'break-all',
})

export const description = style({
  color: theme.colors.textColorGrey,
  marginBottom: 32,
})

export const textRow = style({
  display: 'grid',
  gridTemplateColumns: '60px 88px',
  gap: 16,
})

export const info = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginTop: 'auto',
})

export const manageButton = style({
  minWidth: 20,
  height: 20,
})

export const manageButtonItem = style({
  justifyContent: 'flex-start',
})

export const titleRow = style({
  color: theme.colors.textColorGrey,
})
