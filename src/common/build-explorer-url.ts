import { networksConfig } from '~/networks-config'

const explorers = Object.entries(networksConfig).reduce<Record<string, string>>(
  (acc, [key, { explorerUrl }]) => {
    acc[key] = explorerUrl

    return acc
  },
  {}
)

type Options = {
  network: string
  tx?: string
  address?: string
}

export const buildExplorerUrl = (options: Options) =>
  [
    explorers[options.network],
    options.address ? 'address' : 'tx',
    options.address ? options.address : options.tx,
  ].join('/')
