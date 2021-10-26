import { style, globalStyle } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const slide = style({
  padding: '1px 8px',
})

export const dots = style({
  listStyle: 'none',
  margin: '16px 0 0',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const dot = style({
  width: 8,
  height: 8,
  borderRadius: '50%',
  border: `1px solid ${theme.colors.textColorGrey}`,
  margin: '0 4px',
})

globalStyle(`${dots} .slick-active ${dot}`, {
  background: theme.colors.textColorGrey,
})
