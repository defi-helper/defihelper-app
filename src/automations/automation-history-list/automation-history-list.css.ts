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
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  top: 16,
  right: 32,
})

export const paginationCount = style({
  fontSize: '14px',
  lineHeight: '20px',
  marginRight: 16,
  opacity: 0.64,
})

export const paginationButton = style({
  opacity: 0.16,
  width: 24,
  height: 24,
  border: '1px solid currentColor',
  borderRadius: 4,

  selectors: {
    '&:not(:last-child)': {
      marginRight: 8,
    },
  },
})

export const label = composeStyles(
  row,
  style({
    paddingBottom: 16,
  })
)
