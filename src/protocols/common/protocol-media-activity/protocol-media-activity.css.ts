import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const title = style({
  marginBottom: 24,
})

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(352px, 1fr))',
  gridGap: 24,
})

export const card = style({
  padding: '24px 32px',
  wordBreak: 'break-word',
  display: 'flex',
  flexDirection: 'column',
})

export const cardUsername = style({
  marginBottom: 24,
})

export const cardText = style({
  marginBottom: 28,
})

export const cardDate = style({
  color: theme.colors.textColorGrey,
  marginTop: 'auto',
})
