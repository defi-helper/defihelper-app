import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  overflowX: 'auto',
  overflowY: 'hidden',
})

export const tableInner = style({
  minWidth: 900,
})

export const title = style({
  marginBottom: 24,
})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '1fr auto 122px',
  gridGap: '5%',
  padding: '16px 24px',
  textAlign: 'right',

  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.colors.common.white2}`,
    },
  },
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

export const empty = style({
  padding: '16px 24px',
})

export const chart = style({
  position: 'relative',
})
