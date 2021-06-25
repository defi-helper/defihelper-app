// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  webpack: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      ...(isProd ? { 'effector-logger': 'effector' } : {})
    }
  }
}
