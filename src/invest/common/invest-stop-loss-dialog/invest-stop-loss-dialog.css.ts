import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  maxWidth: 460,
  height: 780,
  padding: '24px 32px 28px',
  display: 'flex',
  flexDirection: 'column',
})

export const title = style({
  color: theme.colors.textColorGrey,
  position: 'relative',
  marginBottom: 32,
  display: 'inline-block',
})

export const subtitle = style({
  marginBottom: 44,
})

export const confirm = style({
  marginTop: 'auto',
})

export const row = style({
  marginBottom: 32,
})

export const rowHeading = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})

export const rowHeadingOpen = style({
  marginBottom: 16,
})

export const input = style({
  marginBottom: 16,
})

export const label = style({
  color: theme.colors.textColorGrey,
  marginBottom: 8,
})

export const inputRow = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 8,
})

export const numberInput = style({
  width: 100,
})

export const slider = style({
  maxWidth: 'calc(100% - 124px)',
  marginLeft: 'auto',
  marginRight: 8,
})

export const price = style({
  marginBottom: 8,
})
