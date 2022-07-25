import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 258,
  minHeight: 216,
})

export const protocolTitle = style({
  display: 'flex',
  gap: 9,
  marginBottom: 16,
})

export const protocolImg = style({
  width: 22,
  height: 22,
})

export const grey = style({
  color: theme.colors.textColorGrey,
})

export const row = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 8,
})

export const tokenIcons = style({
  display: 'inline-flex',
  verticalAlign: 'middle',
  marginRight: 10,
})

export const tokenIconsItem = style({
  width: 16,
  height: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  selectors: {
    '&:not(:last-child)': {
      marginRight: -4,
    },

    '&:not(img)': {
      background: theme.colors.background,
    },
  },
})

export const sellButton = style({
  marginTop: 'auto',
})
