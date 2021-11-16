import { style, globalStyle } from '@vanilla-extract/css'

// import { theme } from '~/common/theme'

export const root = style({
  position: 'fixed',
  right: 10,
  top: 10,
  zIndex: 10000,
})

globalStyle(`${root} > * + *`, {
  marginTop: 20,
})
