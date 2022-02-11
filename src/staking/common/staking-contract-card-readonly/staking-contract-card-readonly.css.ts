import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  minHeight: 76,
})

export const clickable = style({
  cursor: 'pointer',

  '@media': {
    [theme.mediaQueries.hover()]: {
      ':hover': {
        opacity: 0.6,
      },
    },
  },
})

export const tableCol = style({
  display: 'flex',
  alignItems: 'center',
})

export const coinIcons = style({
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: 20,
  marginLeft: -10,
})

export const coinIcon = style({
  width: 24,
  height: 24,
})

export const apyButton = style({
  verticalAlign: 'middle',
  marginLeft: 10,
})

export const autostakingCol = style({
  width: '60%',
})

export const positive = style({
  color: theme.colors.textColorGreen,
})

export const accorionButton = style({
  color: theme.colors.textColorGrey,
  marginLeft: 'auto',
})

export const manageButton = style({
  width: 24,
  height: 24,
  padding: 6,
  marginLeft: 5,
})

export const apy = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
})
