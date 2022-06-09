import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  background: theme.colors.common.blue1,
  position: 'fixed',
  zIndex: 10,
  padding: '22px 24px',
  display: 'flex',
  gap: 56,
  alignItems: 'center',
  left: 16,
  right: 16,
  bottom: 16,
  flexDirection: 'column',

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '22px 56px 22px 24px',
      flexDirection: 'row',
      left: 'auto',
      right: 48,
      bottom: 48,
    },
  },
})

export const text = style({
  fontSize: 18,
  lineHeight: '28px',

  '@media': {
    [theme.mediaQueries.md()]: {
      maxWidth: 576,
    },

    [theme.mediaQueries.lg()]: {
      maxWidth: 876,
    },
  },
})

export const close = style({
  position: 'absolute',
  right: 8,
  top: 8,
})

export const button = style({
  width: '100%',

  '@media': {
    [theme.mediaQueries.md()]: {
      width: 'auto',
    },
  },
})
