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

export const mb16 = style({
  marginBottom: 16,
})

export const subtitle = style([mb16, {}])

export const advancedSettings = style([mb16, {}])

export const form = style({
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
})

export const button = style({
  marginTop: 'auto',
})

export const attention = style([
  mb16,
  {
    color: theme.colors.common.red1,
  },
])
