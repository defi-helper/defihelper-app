import ReactDOM from 'react-dom'
import 'normalize.css'
import cachios from 'cachios'
import dayjs from 'dayjs'
import { BigNumber } from 'bignumber.js'
import { ethers } from 'ethers'
import ethersMulticall from '@defihelper/ethers-multicall'

import { App } from './app'

// For adapters
window.ethersMulticall = ethersMulticall
window.dayjs = dayjs
window.bignumber = BigNumber
window.ethers = ethers
window.axios = cachios

ReactDOM.render(<App />, document.getElementById('root'))
