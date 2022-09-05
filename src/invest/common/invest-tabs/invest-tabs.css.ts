import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const tabHeader = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 18,

  '@media': {
    [theme.mediaQueries.md()]: {
      alignItems: 'center',
      flexWrap: 'nowrap',
      gap: 32,
    },
  },
})

export const tab = style({
  color: theme.colors.textColorGrey,
  borderBottom: '1px solid transparent',
  width: 'calc(50% - 9px)',

  '@media': {
    [theme.mediaQueries.md()]: {
      width: 'unset',
    },
  },
})

export const tabActive = style({
  color: theme.colors.textColorPrimary,
  borderBottom: '1px solid currentColor',
  borderSpacing: 8,
})

export const tabBody = style({
  marginTop: 24,
})
