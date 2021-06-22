export const config = {
  isDev: process.env.NODE_ENV === 'development',
  CHAIN_IDS: [1, 3, 4, 5, 42, 999],
  CHAIN_BINANCE_IDS: [56, 97],
  PORTIS_ID: process.env.REACT_APP_PORTIS_ID,
  FORTMATIC_KEY: process.env.REACT_APP_FORTMATIC_KEY,
  ETH_URL: '',
  POLLING_INTERVAL: 15000,
  TREZOR_URL: process.env.REACT_APP_TREZOR_URL ?? '',
  TREZOR_EMAIL: process.env.REACT_APP_TREZOR_EMAIL ?? ''
} as const
