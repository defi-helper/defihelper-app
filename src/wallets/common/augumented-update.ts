import { ConnectorUpdate } from '@web3-react/types'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { normalizeChainId } from './normalize-chain-id'

export async function augmentConnectorUpdate(
  connector: AbstractConnector,
  update: ConnectorUpdate<string>
) {
  const provider =
    update.provider === undefined
      ? await connector.getProvider()
      : update.provider
  const [chainId, account] = (await Promise.all([
    update.chainId === undefined || typeof update.chainId === 'string'
      ? connector.getChainId()
      : update.chainId,
    update.account === undefined ? connector.getAccount() : update.account,
  ])) as [
    Required<ConnectorUpdate<string>>['chainId'],
    Required<ConnectorUpdate<string>>['account']
  ]

  const normalizedChainId = normalizeChainId(chainId)
  if (
    !!connector.supportedChainIds &&
    !connector.supportedChainIds.includes(Number(normalizedChainId))
  ) {
    throw new Error('Unsupported chainId')
  }

  return {
    connector,
    provider,
    chainId: chainId !== 'W' ? String(normalizedChainId) : chainId,
    account,
  }
}
