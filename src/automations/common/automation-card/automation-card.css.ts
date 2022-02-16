import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  padding: '24px 32px 32px',
  minHeight: 420,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  justifyContent: 'space-between',
  gap: 20,
})

export const type = style({
  color: theme.colors.common.black1,
})

export const manage = style({
  width: 24,
  height: 24,
  border: `1px solid ${theme.colors.textColorPrimary}`,
  borderRadius: 4,
  opacity: 0.64,
  position: 'absolute',
  right: 12,
  top: 12,

  '@media': {
    [theme.mediaQueries.hover()]: {
      ':hover': {
        opacity: 1,
      },
    },
  },
})

export const manageLoading = style({
  pointerEvents: 'none',
})

export const manageActive = style({
  opacity: 1,
})

export const manageIcon = style({
  width: 16,
  height: 16,
})

export const manageIconloading = style({
  opacity: 0,
})

export const circularProgress = style({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  margin: 'auto',
  width: 16,
  height: 16,
})

export const dropdown = style({
  width: 120,
  padding: '8px 16px',
})

export const dropdownItem = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 8,
    },
  },
})

export const red = style({
  color: theme.colors.common.red1,
})

export const titleGreen = style({
  color: theme.colors.textColorGreen,
})

export const titlePink = style({
  color: theme.colors.common.pink3,
})

export const subtitle = style({
  color: theme.colors.textColorGrey,
})
