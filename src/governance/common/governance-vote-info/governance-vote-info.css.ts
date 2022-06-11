import { style, styleVariants } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  width: '100%',
  border: `2px solid ${theme.colors.paper}`,
  padding: '22px 24px',
  position: 'relative',
  borderRadius: 8,
  backgroundColor: theme.colors.paper,
})

export const active = style({
  border: `2px solid ${theme.colors.textColorPrimary}`,
})

export const percentage = style({
  height: 4,
  margin: '8px 0px',
  borderRadius: 12,
})

export const percentageVariants = styleVariants({
  for: {
    background: theme.colors.common.green,
  },

  against: {
    background: theme.colors.common.red1,
  },

  abstain: {
    background: theme.colors.common.grey1,
  },
})

export const voted = style({
  top: 6,
  right: 6,
  display: 'flex',
  padding: '3px 8px',
  position: 'absolute',
  alignItems: 'center',
  borderRadius: 12,
  backgroundColor: theme.colors.textColorPrimary,
  color: theme.colors.textColorSecondary,
})
