import { style } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const root = style({
  padding: 15,
})

export const title = style({
  marginBottom: 10,
})

export const total = style({
  opacity: 0.6,
  fontFamily: 'monospace',
})

export const titleWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 10,
})

export const label = style({
  color: theme.colors.textColorGrey,
  marginBottom: 4,
})

export const row = style({
  marginBottom: 16,
})

export const grid = style({
  display: 'grid',
  gridGap: 20,
  gridTemplateColumns: 'repeat(2, 1fr)',
})
