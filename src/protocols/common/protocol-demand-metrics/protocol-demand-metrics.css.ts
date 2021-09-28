import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const title = style({
  marginBottom: 24,
})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 122px',
  padding: '16px 24px',

  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.colors.common.white2}`,
    },
  },
})

export const chart = style({
  maxWidth: 122,
})

export const grey = style({
  color: theme.colors.textColorGrey,
  marginBottom: 'auto',
})

export const lightGreen = style({
  color: theme.colors.common.green1,
})

export const green = style({
  color: theme.colors.common.green2,
})

export const red = style({
  color: theme.colors.common.red1,
})
