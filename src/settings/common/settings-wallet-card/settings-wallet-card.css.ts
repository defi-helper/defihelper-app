import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  overflow: 'hidden',
})

export const heading = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 16,
})

export const icon = style({
  marginRight: 8,
  display: 'flex',
  alignItems: 'center',
})

export const manage = style({
  width: 24,
  height: 24,
  border: `1px solid ${theme.colors.textColorPrimary}`,
  borderRadius: 4,
  marginLeft: 'auto',
  marginRight: -12,
  marginTop: -24,
  opacity: 0.64,

  '@media': {
    [theme.mediaQueries.hover()]: {
      ':hover': {
        opacity: 1,
      },
    },
  },
})

export const manageActive = style({
  opacity: 1,
})

export const manageIcon = style({
  width: 16,
  height: 16,
})

export const dropdown = style({
  paddingTop: 8,
  paddingBottom: 8,
})

export const dropdownItem = style({
  justifyContent: 'flex-start',

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 8,
    },
  },
})

export const deleteButton = style({
  color: theme.colors.common.red1,
})

export const header = style({
  padding: 24,
})

export const footer = style({
  padding: '16px 24px 24px',
  background: theme.colors.common.blue1,
  color: theme.colors.common.white1,
})

export const error = style({
  background: theme.colors.common.red1,
})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '40% 60%',

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 8,
    },
  },
})

export const infoTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
})

export const opacity = style({
  opacity: 0.64,
})

export const buttons = style({
  display: 'flex',
  gap: 12,
  marginTop: 16,
})

export const deposit = style({
  background: theme.colors.common.white1,
  border: theme.colors.common.white1,
  color: theme.colors.common.black1,
})

export const refund = style({
  background: theme.colors.common.white3,
  border: theme.colors.common.white3,
  color: theme.colors.common.white1,
})

export const question = style({
  width: 16,
  height: 16,
  verticalAlign: 'middle',
})

export const questionDropdown = style({
  width: 252,
  fontSize: 14,
  lineHeight: '20px',
})

export const howItWorks = style({
  color: theme.colors.textColorGrey,
})

export const attention = style({
  width: 27,
  height: 27,
  marginLeft: 'auto',
  color: theme.colors.textColorSecondary,
  position: 'relative',
  right: -12,
  bottom: -12,
})

export const attentionDropdown = style({
  fontSize: 14,
  lineHeight: '20px',
  color: theme.colors.common.red1,
  borderColor: 'currentcolor',
  width: 252,
})
