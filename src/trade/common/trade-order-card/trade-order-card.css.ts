import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const row = style({
  display: 'grid',
  gridTemplateColumns: '16% 16% 14% 1fr 14% 8%',
  alignItems: 'center',
})

export const fs12 = style({
  fontSize: 12,
  lineHeight: '16px',
})

export const status = style([
  fs12,
  {
    marginBottom: 10,
  },
])

export const processing = style([
  fs12,
  {
    marginTop: 47,
  },
])

export const tableRow = style({
  position: 'relative',

  ':before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.colors.common.white3,
    zIndex: 2,
    display: 'none',
  },

  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.colors.border}`,
    },
  },
})

export const tableRowLoader = style({
  ':before': {
    display: 'block',
  },
})

export const tableRowInner = style([
  row,
  {
    padding: 16,
  },
])

export const tableRowInnerLoader = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
})

export const contractName = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginBottom: 4,
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
  },
])

export const contractAddress = style([
  fs12,
  {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: theme.colors.textColorGrey,
  },
])

export const contractBalance = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 4,
    },
  },
})

export const contractBalanceIcon = style([
  contractIcon,
  {
    width: 16,
    height: 16,
  },
])

export const contractStatus = style({
  marginBottom: 35,
})

export const contractActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})

export const dots = style({
  transform: 'rotate(90deg)',
})

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto',
})

export const boughtPrice = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  color: theme.colors.textColorGrey,
  marginBottom: 12,
})

export const positive = style({
  color: theme.colors.textColorGreen,
})

export const negative = style({
  color: theme.colors.common.red1,
})

export const claim = style({
  paddingTop: 20,
})
