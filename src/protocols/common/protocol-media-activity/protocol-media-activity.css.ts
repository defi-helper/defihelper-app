import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const title = style({
  marginBottom: 24,
})

export const grid = style({
  display: 'grid',
  gap: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(352px, 1fr))',
      gap: 24,
    },
  },

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 20,
    },
  },
})

export const card = style({
  padding: '24px 32px',
  wordBreak: 'break-word',
  display: 'flex',
  flexDirection: 'column',
  color: 'inherit',
})

export const cardUsername = style({
  marginBottom: 24,
})

export const cardText = style({
  marginBottom: 28,
})

globalStyle(`${cardText} img`, {
  maxWidth: '100%',
})

globalStyle(`${cardText} a`, {
  color: 'inherit',
})

export const cardDate = style({
  color: theme.colors.textColorGrey,
  marginTop: 'auto',
})

export const twitterIcon = style({
  color: '#1DA1F2',
})

export const icon = style({
  verticalAlign: 'middle',
})

export const more = style({
  display: 'flex',
  justifyContent: 'center',
})
