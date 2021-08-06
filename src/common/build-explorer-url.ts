const explorers: Record<string | number, string> = {
  1: 'https://etherscan.io/address',
  3: 'https://ropsten.etherscan.io/address',
  1666600000: 'https://explorer.harmony.one/address',
  42: 'https://kovan.etherscan.io/address',
  4: 'https://rinkeby.etherscan.io/address',
  5: 'https://goerli.etherscan.io/address',
  56: 'https://bscscan.com/address',
  97: 'https://testnet.bscscan.com/address',
  137: 'https://polygonscan.com/address',
  waves: 'https://wavesexplorer.com/address',
  main: 'https://wavesexplorer.com/address',
}

type Options = {
  network: string | number
  address: string
}

export const buildExplorerUrl = (options: Options) =>
  [explorers[options.network], options.address].join('/')
