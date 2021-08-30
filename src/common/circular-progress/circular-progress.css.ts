import { keyframes, style } from '@vanilla-extract/css'

export const root = style({
  display: 'inline-block',
  position: 'relative',
})

export const svg = style({
  display: 'block',
})

const keyframe = keyframes({
  '0%': {
    strokeDasharray: '1px, 200px',
    strokeDashoffset: 0,
  },
  '50%': {
    strokeDasharray: '100px, 200px',
    strokeDashoffset: '-15px',
  },
  '100%': {
    strokeDasharray: '100px, 200px',
    strokeDashoffset: '-125px',
  },
})

export const circle = style({
  animation: `${keyframe} 1.4s ease-in-out infinite`,
  strokeDasharray: '80px, 200px',
  strokeDashoffset: 0,
  stroke: 'currentColor',
})
