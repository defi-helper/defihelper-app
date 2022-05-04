const isDev =
  process.env.NODE_ENV === 'development' ||
  process.env.REACT_APP_ENV === 'development'

export const config = {
  ENV: process.env.NODE_ENV,
  SENTRY: process.env.REACT_APP_SENTRY,
  IS_DEV: isDev,
  DEFAULT_CHAIN_ID: isDev ? '4' : '1',
  PORTIS_ID: process.env.REACT_APP_PORTIS_ID,
  FORTMATIC_KEY: process.env.REACT_APP_FORTMATIC_KEY,
  ETH_URL: '',
  POLLING_INTERVAL: 15000,
  TREZOR_URL: process.env.REACT_APP_TREZOR_URL ?? '',
  TREZOR_EMAIL: process.env.REACT_APP_TREZOR_EMAIL ?? '',
  WAVES_NODE_URL: process.env.REACT_APP_WAVES_NODE_URL ?? '',
  API_URL: process.env.REACT_APP_API_URL,
  WS_API_URL: process.env.REACT_APP_WS_API_URL,
  ADAPTERS_HOST: process.env.REACT_APP_ADAPTERS_HOST ?? '',
  SCANNER_HOST:
    process.env.REACT_APP_SCANNER_HOST ?? 'https://scanner.defihelper.io/api',
  TELEGRAM_BOT_USERNAME: process.env.REACT_APP_TELEGRAM_BOT_USERNAME,
  MAIN_URL: process.env.REACT_APP_MAIN_URL,
  AMCHARTS_LICENCE: process.env.REACT_APP_AMCHARTS_LICENCE,
  FIX_SUM: 10000,
  MEDIUM_LINK: `https://defihelper.medium.com/auto-staking-explained-da5fbab082e0`,
} as const
