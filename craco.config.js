/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  babel: {
    plugins: [
      '@vanilla-extract/babel-plugin',
      [
        'effector/babel-plugin',
        {
          storeCreators: ['createStore'],
          eventCreators: ['createEvent'],
          effectCreators: ['createEffect'],
          domainCreators: ['createDomain'],
          restoreCreators: ['restore'],
          combineCreators: ['combine'],
          sampleCreators: ['sample'],
          forwardCreators: ['forward'],
          guardCreators: ['guard'],
          attachCreators: [],
          splitCreators: [],
          apiCreators: ['createApi'],
          mergeCreators: [],
          domainMethods: {
            store: ['store', 'createStore'],
            event: ['event', 'createEvent'],
            effect: ['effect', 'createEffect'],
            domain: ['domain', 'createDomain'],
          },
        },
      ],
    ],
  },
  webpack: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      ...(isProd ? { 'effector-logger': 'effector' } : {}),
    },
    plugins: [new VanillaExtractPlugin()],
  },
}
