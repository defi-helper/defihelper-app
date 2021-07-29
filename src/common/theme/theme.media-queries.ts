export const mediaQueries = {
  hover: () => '(hover: hover)' as const,
  xs: () => `screen and (min-width: 0px)` as const,
  sm: () => 'screen and (min-width: 600px)' as const,
  md: () => 'screen and (min-width: 960px)' as const,
  lg: () => 'screen and (min-width: 1440px)' as const,
  xl: () => 'screen and (min-width: 1920px)' as const,
  up: (size: number, dir = 'width') =>
    `screen and (min-${dir}: ${size}px)` as const,
  down: (size: number, dir = 'width') =>
    `screen and (max-${dir}: ${size}px)` as const,
} as const
