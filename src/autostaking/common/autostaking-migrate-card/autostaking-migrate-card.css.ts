import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  padding: '32px 24px 24px',
  position: 'relative',
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  marginBottom: 16,
})

export const grey = style({
  color: theme.colors.textColorGrey,
})

export const item = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 8,
    },
  },
})

export const button = style({
  marginTop: 24,
})

export const hideButton = style({
  position: 'absolute',
  top: 16,
  right: 16,
})

export const hide = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
})

export const hideTitle = style({
  marginBottom: 16,
})

export const hideText = style({
  marginBottom: 'auto',
})

export const hideConfirm = style({
  marginBottom: 8,
})

export const green = style({
  color: theme.colors.textColorGreen,
})

export const howItWorks = style({
  color: theme.colors.common.blue1,
})

export const contractCardIcons = style({
  display: 'flex',
  alignItems: 'center',
})

export const contractCardIcon = style({
  width: 20,
  height: 20,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  selectors: {
    '&:not(:first-child)': {
      marginLeft: -4,
    },
  },
})
