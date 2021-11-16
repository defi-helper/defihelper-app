export const NETWORKS_CHAIN_IDS = new Map<
  string,
  Record<string, number | string>
>([
  [
    'waves',
    {
      mainnet: 'main',
    },
  ],
  [
    'ethereum',
    {
      mainnet: 1,
      ropsten: 3,
      harmony: 1666600000,
      kovan: 42,
      rinkeby: 4,
      goerli: 5,
      bsc: 56,
      'bsc-testnet': 97,
      polygon: 137,
      avalanche: 43114,
    },
  ],
])
