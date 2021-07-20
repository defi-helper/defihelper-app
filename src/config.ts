export const config = {
  IS_DEV: process.env.NODE_ENV === 'development',
  CHAIN_ETHEREUM_IDS: [1, 3, 4, 5, 42, 999] as number[],
  CHAIN_BINANCE_IDS: [56, 97] as number[],
  CHAIN_WAVES_ID: ['waves'] as string[],
  PORTIS_ID: process.env.REACT_APP_PORTIS_ID,
  FORTMATIC_KEY: process.env.REACT_APP_FORTMATIC_KEY,
  ETH_URL: '',
  POLLING_INTERVAL: 15000,
  TREZOR_URL: process.env.REACT_APP_TREZOR_URL ?? '',
  TREZOR_EMAIL: process.env.REACT_APP_TREZOR_EMAIL ?? '',
  WAVES_NODE_URL: process.env.REACT_APP_WAVES_NODE_URL ?? '',
  API_URL: process.env.REACT_APP_API_URL,
  ADAPTERS_HOST: process.env.REACT_APP_ADAPTERS_HOST
} as const
