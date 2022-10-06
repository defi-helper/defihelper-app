import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  width: 352,
  padding: 32,
})

export const title = style({
  color: theme.colors.textColorGreen,
  marginBottom: 16,
})

export const tabs = style({})

export const tabsTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: 7,
  marginBottom: 4,
  color: theme.colors.textColorGrey,
})

export const tabsPaper = style({
  background: theme.colors.tertiary,
  borderRadius: 8,
  padding: 2,
  display: 'grid',
  gap: 4,
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
})

export const tabsItem = style({
  padding: '6px 0',
  borderRadius: 6,
})

export const tabsItemActive = style({
  background: theme.colors.common.green2,
  color: theme.colors.common.white1,
})

export const mb16 = style({
  marginBottom: 16,
})

export const howItWorks = style({
  fontSize: 12,
  lineHeight: '16px',
})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  padding: '16px 24px',

  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.colors.border}`,
    },
  },
})
