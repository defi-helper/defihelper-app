import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  height: 484,
  width: 560,
  padding: '12px 24px 32px',
  display: 'flex',
  flexDirection: 'column',
})

export const title = style({
  marginBottom: 32,
})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '150px 1fr',
  alignItems: 'center',
  gap: 10,

  selectors: {
    '&:not(:last-of-type)': {
      marginBottom: 16,
    },
  },
})

globalStyle(`${row} > *:first-child`, {
  color: theme.colors.textColorGrey,
})

export const button = style({
  marginTop: 'auto',
})

export const contractName = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})

export const contractIcons = style({
  display: 'flex',
  alignItems: 'center',
})

export const contractIcon = style({
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  selectors: {
    '&:not(:first-child)': {
      marginLeft: -4,
    },
  },
})

export const contractUnknownTokenIcon = style([
  contractIcon,
  {
    borderRadius: '50%',
    background: theme.colors.background,
  },
])
