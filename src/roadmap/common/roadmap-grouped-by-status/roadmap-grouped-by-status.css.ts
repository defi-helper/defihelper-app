import { style, styleVariants } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gridGap: 24,
})

export const list = style({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
})

export const colTitle = style({
  marginBottom: 16,
  display: 'block',
  textDecoration: 'none',
})

export const colTitles = styleVariants({
  open: {
    color: theme.colors.common.pink3,
  },

  executed: {
    color: theme.colors.common.green2,
  },

  defeated: {
    color: theme.colors.common.red1,
  },

  in_process: {
    color: theme.colors.common.blue1,
  },
})
