import { style, globalStyle } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  padding: '15px 11px',
  display: 'flex',
  flexDirection: 'column',

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '32px 28px',
    },
  },
})

export const title = style({
  marginBottom: 37,
})

export const content = style({
  backgroundColor: theme.colors.textColorSecondary,
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
  padding: '15px 20px 23px',

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '30px 40px 43px',
    },
  },
})

export const contentHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 10,
})

export const value = style({
  fontSize: 39,
  lineHeight: '52px',
})

export const button = style({
  marginTop: 'auto',
})

export const green = style({
  color: theme.colors.textColorGreen,
})

export const red = style({
  color: theme.colors.common.red1,
})

export const brown = style({
  color: theme.colors.textColorBrown,
})

export const table = style({
  borderCollapse: 'collapse',
})

export const row = style({
  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.colors.textColorPrimary}`,
    },
  },
})

export const col = style({
  padding: '11px 0',
})

export const fs14 = style({
  fontSize: '14px',
})

export const slider = style({
  marginBottom: 22,
})

globalStyle(`${slider} .rc-slider-rail`, {
  background: theme.colors.common.grey5,
  borderRadius: 6,
  height: 12,
})

globalStyle(`${slider} .rc-slider-track`, {
  borderRadius: 6,
  height: 12,
  backgroundColor: theme.colors.textColorGreen,
})

globalStyle(`${slider} .rc-slider-handle`, {
  width: 36,
  height: 36,
  background: theme.colors.common.white1,
  border: '1px solid rgba(0, 0, 0, 0.15)',
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)',
  borderRadius: 18,
  opacity: 1,
  marginTop: -14,
})

globalStyle(`${slider} .rc-slider-handle:active`, {
  boxShadow: 'none',
})
