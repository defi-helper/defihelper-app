import ReactDOM from 'react-dom'
import 'normalize.css'
import cachios from 'cachios'
import dayjs from 'dayjs'
import { BigNumber } from 'bignumber.js'
import { ethers } from 'ethers'
import ethersMulticall from '@defihelper/ethers-multicall'
import * as Uniswap3Core from '@uniswap/sdk-core'
import * as Uniswap3SDK from '@uniswap/v3-sdk'

import { App } from './app'
import { config } from './config'

// For adapters
window.ethersMulticall = ethersMulticall
window.dayjs = dayjs
window.bignumber = BigNumber
window.ethers = ethers
window.axios = cachios
window.uniswap3 = {
  core: Uniswap3Core,
  sdk: Uniswap3SDK,
}

if (!config.IS_DEV) {
  const root = document.getElementsByTagName('head')[0]
  const script = document.createElement('script')

  script.innerHTML = `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-NWWFXMV'); window.dataLayer = window.dataLayer || [];`

  root.appendChild(script)
}

ReactDOM.render(<App />, document.getElementById('root'))
