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

export const pow = style({
  position: 'absolute',
  bottom: 'calc(100% + 5px)',
  right: 0,
})

export const kessak = style([
  pow,
  {
    border: `1px solid currentColor`,
    minWidth: 20,
    height: 20,
    padding: '0 3px',
    fontSize: 12,
  },
])
