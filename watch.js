/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-destructuring */
process.env.NODE_ENV = 'development'

const fs = require('fs-extra')
const paths = require('react-scripts/config/paths')
const webpack = require('webpack')
const path = require('path')
const config = require('react-scripts/config/webpack.config.js')('development')
const configProd = require('react-scripts/config/webpack.config.js')(
  'production'
)
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

config.resolve.alias = {
  ...config.resolve.alias,
  '~': path.resolve(__dirname, './src')
}

config.output.path = configProd.output.path

config.entry = Array.isArray(config.entry)
  ? config.entry.filter((fileName) => !fileName.match(/webpackHotDevClient/))
  : config.entry
config.plugins = config.plugins.filter(
  (plugin) =>
    !(plugin instanceof webpack.HotModuleReplacementPlugin) ||
    !(plugin instanceof ReactRefreshWebpackPlugin)
)

config.resolve.plugins = []

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: (file) => file !== paths.appHtml
  })
}

webpack(config).watch({}, (err, stats) => {
  if (err) {
    console.error(err)
  } else {
    copyPublicFolder()
  }
  console.error(
    stats.toString({
      chunks: false,
      colors: true
    })
  )
})
