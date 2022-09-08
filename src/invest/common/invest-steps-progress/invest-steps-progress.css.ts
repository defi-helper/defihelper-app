import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const steps = style({
  display: 'grid',
  gap: 4,
  gridTemplateColumns: 'repeat(auto-fit, minmax(1px, 1fr))',
  marginBottom: 8,
})

export const stepsItem = style({
  background: theme.colors.paper,
  borderRadius: 17,
  height: 4,
})

export const stepsItemCurrent = style({
  background: theme.colors.primary,
})

export const stepsItemSuccess = style({
  background: theme.colors.common.green1,
})
