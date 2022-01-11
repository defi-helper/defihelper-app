import { style } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const root = style({
  padding: '8px 26px 8px 26px',
  transition: '.2s',
  selectors: {
    '&:hover': {
      background: '#22292a',
    },
  },
})

export const tableHeadings = style({
  color: theme.colors.textColorGrey,
  padding: '16px 26px 0',
})

export const tableBody = style({
  padding: '0 26px 16px',
})

export const rootActive = style({
  background: '#22292a',
})

export const loadingWrapper = style({
  display: 'flex',
  justifyContent: 'center',
})

export const platformName = style({
  display: 'grid',
  gridTemplateColumns: '24px auto',
  lineHeight: '24px',
  gridGap: 10,
})

export const platformLogoPlaceholder = style({
  width: 24,
  height: 24,
  background: '#3a3a3a',
  borderRadius: 16,
})

export const platformLogo = style({
  width: 24,
  height: 24,
})

export const platformColumnsList = style({
  display: 'grid',
  gridTemplateColumns: '38% 20% 20% 20% 2%',
})

export const platformAssetsList = style({
  paddingTop: 10,
  display: 'none',
  marginTop: 10,
})

export const platformAssetsListUnCollapsed = style({
  display: 'block',
})
