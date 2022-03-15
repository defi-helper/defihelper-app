import type { Provider } from '@waves/signer'
import { Signer } from '@waves/signer'

const isWavesSigner = (provider: unknown): provider is Signer => {
  return (
    provider !== null && provider !== undefined && provider instanceof Signer
  )
}

const signWaves = async (provider: Provider, message: string) => {
  let signature: string

  try {
    signature = await provider.signMessage(message)

    return {
      signature,
    }
  } catch (error) {
    if (typeof error === 'string') {
      throw new Error(error)
    }

    throw error
  }
}

export const signMessageWaves = async (
  provider: unknown,
  address: string,
  message: string
) => {
  const data = {
    address,
    message,
    network: 'main',
  }

  let signedData:
    | {
        signature: string
      }
    | undefined

  if (isWavesSigner(provider) && provider.currentProvider) {
    signedData = await signWaves(provider.currentProvider, message)
  }

  if (!signedData) {
    throw new Error('unknown signer')
  }

  return {
    ...data,
    ...signedData,
  }
}
