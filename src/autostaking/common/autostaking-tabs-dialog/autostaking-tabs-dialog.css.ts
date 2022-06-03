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

export const form = style({
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
})

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 'auto',
  flex: '1 0 auto',
})

export const input = style({
  marginBottom: 40,
})

export const button = style({
  marginTop: 30,
})

export const loader = style({
  display: 'flex',
  gap: 4,
})

export const loaderItem = style({
  width: 16,
  height: 24,
  border: `1px solid ${theme.colors.common.blue1}`,
})

export const loaderItemActive = style({
  background: theme.colors.common.blue1,
})

export const success = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  flex: '1 0 auto',
  justifyContent: 'center',
  alignItems: 'center',
})

export const successIcon = style({
  color: theme.colors.textColorGreen,
})

export const balance = style({
  color: theme.colors.common.blue1,
  marginLeft: 'auto',
})
