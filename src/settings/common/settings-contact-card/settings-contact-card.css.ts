import { style } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const root = style({
  padding: 32,
  minHeight: 168,
  display: 'flex',
  flexDirection: 'column',

  '@media': {
    [theme.mediaQueries.md()]: {
      minHeight: 183,
    },
  },
})

export const title = style({
  display: 'flex',
  alignItems: 'center',
  color: theme.colors.textColorGreen,
  marginBottom: 18,
})

export const subtitle = style({
  marginBottom: 10,
  display: 'flex',
  alignItems: 'center',
})

export const icon = style({
  width: 24,
  height: 24,
  verticalAlign: 'middle',
  marginRight: 4,
})

export const buttons = style({
  marginLeft: 'auto',
})

export const switcher = style({
  marginTop: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
})

export const dropdownItem = style({
  justifyContent: 'flex-start',

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 8,
    },
  },
})

export const date = style({
  gap: 11,
  marginLeft: 'auto',
})

export const connectPrimaryButton = style({
  marginTop: 10,
})

export const connect = style({})

export const disconnect = style({
  color: theme.colors.common.red1,
})

export const dropdown = style({
  maxHeight: 300,
  overflow: 'scroll',
})
