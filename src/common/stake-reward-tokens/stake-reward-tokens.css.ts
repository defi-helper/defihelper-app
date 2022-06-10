import { style, globalStyle } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const tokens = style({
  display: 'flex',
  alignItems: 'center',
})

export const buttonIcon = style({
  selectors: {
    '&:not(:first-child)': {
      marginLeft: -4,
    },
  },
})

export const icon = style({
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const link = style({
  alignItems: 'center',
  verticalAlign: 'middle',
})

export const tokenInfo = style({
  maxWidth: 276,
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '24px 1fr',
  gap: 8,
})

globalStyle(`${tokenInfo} div${icon}`, {
  background: theme.colors.background,
})

export const tokenIconArrow = style({
  margin: '0 6px',
})

export const tokenInfoClose = style({
  position: 'absolute',
  right: 0,
  top: 0,
})
