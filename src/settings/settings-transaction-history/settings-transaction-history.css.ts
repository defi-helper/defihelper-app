import { style, styleVariants } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const title = style({
  marginBottom: 24,
})

export const empty = style({
  padding: '96px 0',
  maxWidth: 503,
  margin: 'auto',
})

export const content = style({
  padding: '0 0 16px',
})

export const grey = style({
  color: theme.colors.textColorGrey,
})

export const tableHead = style({
  padding: '16px 32px',
  borderBottom: `1px solid ${theme.colors.border}`,
  marginBottom: 16,
  display: 'flex',
  justifyContent: 'space-between',
})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
  padding: '0 32px',

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 8,
    },
  },
})

export const statuses = styleVariants({
  accepted: {
    color: theme.colors.common.green,
  },

  pending: {
    color: theme.colors.textColorGrey,
  },

  rejected: {
    color: theme.colors.common.red1,
  },
})

export const select = style({
  width: 200,
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 16px',
})

export const selectArrow = style({
  marginLeft: 4,
})

export const selectOption = style({
  justifyContent: 'flex-start',
})

export const selectOptionActive = style({
  opacity: 0.4,
})

export const pagination = style({
  display: 'flex',
  alignItems: 'center',
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
