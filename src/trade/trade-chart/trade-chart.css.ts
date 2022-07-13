import { style, globalStyle } from '@vanilla-extract/css'

// import { theme } from '~/common/theme'

export const root = style({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  paddingTop: '56.25%',
  zIndex: 0,
})

globalStyle(`${root} iframe`, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
})
