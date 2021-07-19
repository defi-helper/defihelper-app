export function normalizeChainId(chainId: string | number) {
  let normalizedChainId = chainId

  if (typeof chainId === 'string') {
    // Temporary fix until the next version of Metamask Mobile gets released.
    // In the current version (0.2.13), the chainId starts with “Ox” rather
    // than “0x”. Fix: https://github.com/MetaMask/metamask-mobile/pull/1275
    normalizedChainId = chainId.replace(/^Ox/, '0x')

    const parsedChainId = Number.parseInt(
      normalizedChainId,
      normalizedChainId.trim().substring(0, 2) === '0x' ? 16 : 10
    )
    return parsedChainId
  }

  return chainId
}
