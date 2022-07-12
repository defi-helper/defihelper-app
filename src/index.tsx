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

ReactDOM.render(<App />, document.getElementById('root'))
