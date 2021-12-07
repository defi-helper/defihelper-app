import { style, composeStyles } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const title = style({
  marginBottom: 24,
})

export const root = style({
  minWidth: 900,
})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  padding: '0 32px 8px',
})

export const header = composeStyles(
  row,
  style({
    padding: '16px 32px',
    borderBottom: `1px solid ${theme.colors.border}`,
    marginBottom: 16,
    color: theme.colors.textColorGrey,
    position: 'relative',
  })
)

export const pagination = style({
  position: 'absolute',
  top: 16,
  right: 32,
})

export const label = composeStyles(
  row,
  style({
    paddingBottom: 16,
  })
)
