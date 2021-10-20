import ReactDOM from 'react-dom'
import 'normalize.css'
import cachios from 'cachios'
import dayjs from 'dayjs'
import { BigNumber } from 'bignumber.js'
import { ethers } from 'ethers'
import ethersMulticall from '@defihelper/ethers-multicall'
import TagManager from 'react-gtm-module'

import { App } from './app'
import { config } from './config'

// For adapters
window.ethersMulticall = ethersMulticall
window.dayjs = dayjs
window.bignumber = BigNumber
window.ethers = ethers
window.axios = cachios

if (!config.IS_DEV) {
  TagManager.initialize({
    gtmId: 'GTM-NWWFXMV',
  })
}

ReactDOM.render(<App />, document.getElementById('root'))
