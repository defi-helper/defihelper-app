import { style } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const root = style({
  display: 'grid',
  gridTemplateColumns: '10% 26% 20% 12% 12% 10% 10%',

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 16,
    },
  },
})

export const assetName = style({
  display: 'grid',
  gridTemplateColumns: '24px auto',
  lineHeight: '24px',
  gridGap: 10,
})

export const assetLogoPlaceholder = style({
  width: 24,
  height: 24,
  background: '#3a3a3a',
  borderRadius: 16,
})

export const assetLogo = style({
  width: 24,
  height: 24,
})

export const changePlus = style({
  color: theme.colors.common.green2,
})

export const changeMinus = style({
  color: theme.colors.common.red1,
})
