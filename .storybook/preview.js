import { ThemeProvider } from '../src/common/theme'
import { DialogProvider } from '../src/common/dialog'
import '../src/assets/fonts/Basier-Square-Mono-Regular-Webfont/stylesheet.css'
import '../src/assets/fonts/Basier-Square-regular-webfont/stylesheet.css'
import '../src/app.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => {
    return (
      <ThemeProvider>
        <DialogProvider>
          <Story />
        </DialogProvider>
      </ThemeProvider>
    )
  },
]
