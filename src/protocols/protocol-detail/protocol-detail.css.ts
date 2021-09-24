import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  padding: 0,
  margin: 0,
  listStyle: 'none',
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 28,
})

export const icon = style({
  verticalAlign: 'middle',
  width: 36,
  height: 36,
  marginRight: 12,
})

export const protocolLink = style({
  padding: '8px 16px',
  marginLeft: 'auto',
})

export const mb120 = style({
  marginBottom: 120,
})

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(352px, 1fr))',
  gridGap: 24,
})

export const grey = style({
  color: theme.colors.textColorGrey,
  marginBottom: 'auto',
})

export const lightGreen = style({
  color: theme.colors.common.green1,
})

export const green = style({
  color: theme.colors.common.green2,
})

export const red = style({
  color: theme.colors.common.red,
})

export const card = style({
  padding: '24px 32px',
  minHeight: 400,
})

export const subtitle = style({
  marginBottom: 24,
})

export const flex = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

export const overview = style({
  display: 'grid',
  gridTemplateColumns: '560px 1fr',
  gridGap: 63,
})

export const tag = style({
  background: 'rgba(255, 255, 255, 0.08)',
  borderRadius: 6,
  padding: '6px 12px',
  textTransform: 'uppercase',
  fontFamily: theme.fonts.mono,
  marginBottom: 8,
  fontSize: 14,
  lineHeight: '20px',
  color: theme.colors.textColorGrey,

  selectors: {
    '&:not(:last-child)': {
      marginRight: 8,
    },
  },
})

export const overviewItem = style({
  marginBottom: 24,
})

export const overviewTitles = style({
  marginBottom: 8,
})
