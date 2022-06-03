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

export const subtitle = style([mb, {}])

export const video = style({
  marginBottom: 'auto',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  paddingTop: '56.25%',
  zIndex: 0,
})

export const iframe = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
})

export const playButton = style({
  width: 57,
  height: 57,
  borderRadius: '50%',
  background: theme.colors.common.green1,
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  justifyContent: 'center',
  color: theme.colors.common.black1,
  margin: 'auto',
  paddingLeft: 6,
})

export const link = style({
  marginTop: 32,
  marginBottom: 32,
})

export const checkbox = style([
  mb,
  {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
])
