import { config } from '~/config'

export const buildAdaptersUrl = (protocolAdapter?: string) => {
  if (!protocolAdapter) throw new Error('protocolAdapter is required')

  return `${config.ADAPTERS_HOST}adapters/${protocolAdapter}.js`
}
