import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  display: 'grid',
  gridTemplateColumns: '10% 40% 20% 15% 15%',

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 16,
    },
  },
})

export const headings = style({
  color: theme.colors.textColorGrey,
})

export const blue = style({
  color: theme.colors.common.blue1,
})

export const question = style({
  verticalAlign: 'middle',
})

export const dropdown = style({
  width: 296,
  height: 132,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})
