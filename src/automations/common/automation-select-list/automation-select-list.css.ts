import { style, globalStyle } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const list = style({
  padding: 0,
  margin: 0,
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: 'calc(100% - 40px)',
})

export const listItem = style({
  margin: '0 -16px',
})

export const listItemButton = style({
  padding: '10px 16px',
  justifyContent: 'flex-start',
  position: 'relative',
  width: '100%',
  textAlign: 'left',

  ':before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8,
    background: 'currentcolor',
    opacity: 0,
  },
})

export const listItemButtonLoading = style({
  opacity: 0,
})

export const listItemButtonLoadingProgress = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  margin: 'auto',
  height: '1em',
  width: '1em',
})

globalStyle(`${listItemButton}:hover:before`, {
  '@media': {
    [theme.mediaQueries.hover()]: {
      opacity: 0.08,
    },
  },
})

export const icon = style({
  width: 24,
  height: 24,
  marginRight: 4,
})
