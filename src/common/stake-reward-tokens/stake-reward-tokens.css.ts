import { style, globalStyle } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const tokens = style({
  display: 'flex',
  alignItems: 'center',
})

export const wrap = style({
  position: 'relative',
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

export const tokenName = style({
  wordWrap: 'break-word',
  width: '215px',
})

export const tokenIconArrow = style({
  margin: '0 6px',
})

export const dropdown = style({
  position: 'absolute',
  display: 'none',
  flexDirection: 'column',
  padding: 16,
  border: `1px solid ${theme.colors.border}`,
  boxShadow: '0px 8px 24px rgba(10, 18, 19, 0.4)',
  zIndex: 100,
  width: 276,
  gap: 8,
  top: '100%',
  left: 0,
  opacity: 1,
})

globalStyle(`${wrap}:hover ${dropdown}`, {
  display: 'flex',
})

globalStyle(`${dropdown} div${icon}`, {
  background: theme.colors.background,
})

export const tokenTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
})
