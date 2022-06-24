import { style, globalStyle, styleVariants } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  position: 'relative',
  display: 'inline-block',
})

export const rootSizes = styleVariants({
  small: {
    width: 28,
    height: 16,
  },

  medium: {
    width: 56,
    height: 32,
  },
})

export const track = style({
  backgroundColor: theme.colors.switchTrack,
  display: 'block',
  width: 'inherit',
  height: 'inherit',
  borderRadius: 100,
  transition: 'background-color .3s ease-in-out',
})

export const trackError = style({
  backgroundColor: theme.colors.common.red1,
})

export const thumb = style({
  backgroundColor: theme.colors.common.white1,
  borderRadius: '50%',
  position: 'absolute',
  margin: 'auto',
  transition: 'transform .3s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.colors.common.black1,
})

export const thumbSizes = styleVariants({
  small: {
    top: 2,
    left: 2,
    bottom: 2,
    height: 12,
    width: 12,
  },

  medium: {
    top: 4,
    left: 4,
    bottom: 4,
    height: 24,
    width: 24,
  },
})

export const thumbError = style({})

export const input = style({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  opacity: 0,
  zIndex: 1,
  margin: 0,
  cursor: 'pointer',
})

globalStyle(`${input}:checked + ${track}:not(${trackError})`, {
  backgroundColor: theme.colors.common.green2,
})

globalStyle(`${input}:checked ~ ${thumbSizes.medium}:not(${thumbError})`, {
  transform: 'translateX(24px)',
})

globalStyle(`${input}:checked ~ ${thumbSizes.small}:not(${thumbError})`, {
  transform: 'translateX(12px)',
})
