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
  gap: 20,

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 8,
    },
  },
})

export const statuses = styleVariants({
  confirmed: {
    color: theme.colors.common.green,
  },

  pending: {
    color: theme.colors.textColorGrey,
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

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
