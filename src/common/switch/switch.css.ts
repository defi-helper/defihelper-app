import { style, globalStyle } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  position: 'relative',
  display: 'inline-block',
  width: 56,
  height: 32,
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
  top: 4,
  left: 4,
  bottom: 4,
  margin: 'auto',
  height: 24,
  width: 24,
  transition: 'transform .3s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.colors.common.black1,
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

globalStyle(`${input}:checked ~ ${thumb}:not(${thumbError})`, {
  transform: 'translateX(24px)',
})
