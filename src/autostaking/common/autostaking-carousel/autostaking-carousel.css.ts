import { style, globalStyle } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  overflow: 'hidden',
})

export const slide = style({
  padding: '0 12px',
})

export const dots = style({
  listStyle: 'none',
  margin: '0',
  padding: '9px 10px 7px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 16,
  background: theme.colors.common.blue1,
})

export const dot = style({
  width: 15,
  height: 15,
  borderRadius: '50%',
  background: theme.colors.secondary,
  margin: '0 4px',
})

globalStyle(`${root} .slick-list`, {
  marginLeft: '-12px',
  marginRight: '-12px',
})

globalStyle(`${dots} .slick-active ${dot}`, {
  background: theme.colors.primary,
})

globalStyle(`${root} .slick-dots`, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '24px 0 0',
  gap: 16,
})
