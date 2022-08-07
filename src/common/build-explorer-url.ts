import { networksConfig } from '~/networks-config'

const explorers = Object.entries(networksConfig).reduce<Record<string, string>>(
  (acc, [key, { explorerURL }]) => {
    acc[key] = explorerURL

    return acc
  },
  {}
)

type Options = {
  network: string
  tx?: string
  address?: string
}

export const buildExplorerUrl = (options: Options) => {
  if (['main', 'test'].includes(options.network)) {
    return [
      explorers[options.network],
      options.address ? 'addresses' : 'transactions',
      options.address ? options.address : options.tx,
    ].join('/')
  }

  return [
    explorers[options.network],
    options.address ? 'address' : 'tx',
    options.address ? options.address : options.tx,
  ].join('/')
}
