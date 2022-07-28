import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

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

export const wrap = style({
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

export const error = style({
  background: theme.colors.common.red1,
  color: theme.colors.common.white1,
  borderRadius: 8,
  padding: 8,
})
