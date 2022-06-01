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

export const header = style([
  mb,
  {
    display: 'flex',
    gap: 16,
  },
])

export const subtitle = style([mb, {}])

export const tab = style([
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
      opacity: 0,
    },
  },
])

export const tabActive = style({
  ':after': {
    opacity: 1,
  },
})
