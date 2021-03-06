import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  width: 360,
  height: 536,
  padding: '24px 32px',
  display: 'flex',
  flexDirection: 'column',
})

export const tabs = style({
  display: 'flex',
  gap: 18,
  marginBottom: 26,
})

export const title = style({
  color: theme.colors.textColorGreen,
})

export const description = style({
  marginBottom: 22,
})

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flex: '1 0 auto',
})

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto',
})

export const button = style({
  marginTop: 'auto',
})

export const input = style({
  marginBottom: 16,
})

export const label = style({
  color: theme.colors.textColorGrey,
  marginBottom: 4,
  fontSize: 14,
  lineHeight: '20px',
})

export const radio = style({
  selectors: {
    '&:not(:last-child)': {
      marginRight: 10,
    },
  },
})

export const img = style({
  width: 24,
  height: 24,
  marginRight: 5,
  verticalAlign: 'middle',
})

export const imgPlaceHolder = style([
  img,
  {
    background: theme.colors.border,
    borderRadius: '50%',
  },
])

export const balance = style({
  color: theme.colors.common.blue1,
  marginLeft: 'auto',
})
