import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  background: theme.colors.common.green1,
  color: theme.colors.common.black1,
  padding: 20,
  borderRadius: 4,
  maxWidth: 357,
  position: 'relative',
})

export const content = style({
  marginBottom: 40,
})

export const close = style({
  position: 'absolute',
  right: -10,
  top: -10,
  width: 21,
  height: 21,
  borderRadius: '50%',
  background: theme.colors.textColorPrimary,
  color: theme.colors.textColorSecondary,
})

export const buttons = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 20,
})

export const next = style({
  color: `${theme.colors.common.black1} !important`,
  borderColor: theme.colors.common.black1,
})
