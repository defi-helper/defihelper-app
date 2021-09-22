import { themeContract } from './theme.css'
import { mediaQueries } from './theme.media-queries'

export const theme = {
  ...themeContract,
  mediaQueries,
}
export * from './theme.provider'
export { useTheme } from './theme.context'
