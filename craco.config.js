/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin')
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  babel: {
    plugins: ['@vanilla-extract/babel-plugin'],
  },
  webpack: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      ...(isProd ? { 'effector-logger$': 'effector' } : {}),
    },
    plugins: {
      add: [
        new VanillaExtractPlugin(),
        // new SpeedMeasurePlugin({
        //   outputFormat: 'humanVerbose',
        //   loaderTopFiles: 5,
        // }),
      ],
      remove: ['IgnorePlugin', 'CaseSensitivePathsPlugin', 'ESLintPlugin'],
    },
  },
}
