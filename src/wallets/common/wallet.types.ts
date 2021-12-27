import type { AbstractConnector } from '@web3-react/abstract-connector'
import { ConnectorUpdate } from '@web3-react/types'

export type Wallet = ConnectorUpdate<string> & {
  connector?: AbstractConnector
  blockchain: string | null
}

export type SignMessagePayload = {
  chainId: string
  account: string
  provider: unknown
  connector: AbstractConnector
  blockchain: string
}
