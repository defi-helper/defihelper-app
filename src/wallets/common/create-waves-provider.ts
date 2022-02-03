import type { Signer } from '@waves/signer'

export const createWavesProvider = (walletProvider: unknown) => {
  return walletProvider as Signer
}
