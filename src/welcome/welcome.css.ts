import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const title = style({
  marginBottom: 32,
  display: 'none',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'block',
    },
  },
})

export const grid = style({
  display: 'grid',
  gap: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: '1fr 1fr',
      gap: 30,
    },
  },
})

export const dataItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'transform .2s ease-in-out',
  padding: 24,
  color: 'inherit',

  '@media': {
    [theme.mediaQueries.hover()]: {
      ':hover': {
        transform: 'scale(1.05)',
      },
    },
  },
})

export const dataItemTitle = style({
  transition: 'color .2s ease-in-out',
  marginBottom: 16,

  '@media': {
    [theme.mediaQueries.down(959)]: {
      color: theme.colors.textColorGreen,
    },

    [theme.mediaQueries.md()]: {
      marginBottom: 32,
    },
  },
})

export const dataItemImg = style({
  maxWidth: 210,
  maxHeight: 112,
  width: '100%',
  marginBottom: 24,

  '@media': {
    [theme.mediaQueries.md()]: {
      marginBottom: 40,
    },
  },
})

export const dataItemText = style({
  transition: 'color .2s ease-in-out',
  marginBottom: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      marginBottom: 48,
    },
  },
})

export const dataItemButton = style({
  marginTop: 'auto',
  transition: `background-color .2s ease-in-out, color .2s ease-in-out, border .2s ease-in-out`,

  '@media': {
    [theme.mediaQueries.down(959)]: {
      background: theme.colors.common.green1,
      color: `${theme.colors.common.black1} !important`,
      border: `1px solid ${theme.colors.common.green1}`,
    },
  },
})

globalStyle(`${dataItem}:hover ${dataItemTitle}`, {
  '@media': {
    [theme.mediaQueries.hover()]: {
      color: theme.colors.textColorGreen,
    },
  },
})

globalStyle(`${dataItem}:hover ${dataItemButton}`, {
  '@media': {
    [theme.mediaQueries.hover()]: {
      background: theme.colors.common.green1,
      color: theme.colors.common.black1,
      border: `1px solid ${theme.colors.common.green1}`,
      opacity: 1,
    },
  },
})
