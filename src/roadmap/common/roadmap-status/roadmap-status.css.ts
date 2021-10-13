import { style, styleVariants } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const root = style({
  padding: '6px 12px',
  borderRadius: 100,
  border: '1px solid currentColor',
  display: 'inline-block',
})

export const colors = styleVariants({
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
