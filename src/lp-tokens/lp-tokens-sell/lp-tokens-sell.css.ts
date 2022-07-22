import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const title = style({
  marginBottom: 16,
})

export const subtitle = style({
  marginBottom: 24,
  color: theme.colors.textColorGrey,
})

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(258px, 1fr))',
  gap: 24,
})
