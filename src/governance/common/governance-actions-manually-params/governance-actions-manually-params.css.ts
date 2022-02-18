import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const title = style({
  marginBottom: 24,
})

export const form = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
})

export const input = style({
  position: 'relative',

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 32,
    },
  },
})

export const button = style({
  marginTop: 'auto',
})

export const error = style({
  color: theme.colors.common.red1,
})
