import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  maxWidth: 460,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  height: 704,
  padding: 32,
})

export const mb = style({
  marginBottom: 24,
})

export const title = style([
  {
    color: theme.colors.textColorGreen,
    position: 'relative',

    ':after': {
      content: "''",
      height: 1,
      width: '100%',
      position: 'absolute',
      top: 'calc(100% + 4px)',
      left: 0,
      background: theme.colors.textColorGreen,
    },
  },
])

export const subtitle = style({
  marginBottom: 48,
})

export const form = style({
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
})

export const grey = style({
  color: theme.colors.textColorGrey,
})

export const input = style({
  marginBottom: 16,
})

export const balances = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginBottom: 'auto',
})

export const recomendedBalance = style({
  color: theme.colors.common.blue1,
})

export const button = style({
  marginTop: 30,
})
