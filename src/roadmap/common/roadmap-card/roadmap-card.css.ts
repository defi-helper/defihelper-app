import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  padding: '24px 32px',
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  minHeight: 196,
})

export const proposalTitle = style({
  textDecoration: 'none',
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
  width: 20,
  height: 20,
  position: 'absolute',
  right: 32,
  top: 24,
})

export const manageButtonItem = style({
  justifyContent: 'flex-start',
})

export const titleRow = style({
  color: theme.colors.textColorGrey,
})
