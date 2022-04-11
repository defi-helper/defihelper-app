import { style, globalStyle, keyframes } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  color: theme.colors.common.pink4,
  display: 'inline-block',
})

globalStyle(`${root} path`, {
  animationTimingFunction: 'cubic-bezier(0, 1, 1, 0)',
})

const second = keyframes({
  '0%': {
    transform: 'translate(0, 0)',
  },
  '100%': {
    transform: 'translate(24px, 0)',
  },
})

globalStyle(`${root} path:nth-child(3)`, {
  animation: `${second} 0.8s infinite`,
})

globalStyle(`${root} path:first-child`, {
  animation: `${second} 0.8s infinite`,
})

const third = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
})

globalStyle(`${root} path:nth-child(2)`, {
  animation: `${third} 0.8s infinite`,
})
