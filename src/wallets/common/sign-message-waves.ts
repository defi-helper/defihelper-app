import type { Provider } from '@waves/signer'
import { Signer } from '@waves/signer'

const isWavesExchangeSigner = (provider: unknown): provider is Signer => {
  return (
    provider !== null && provider !== undefined && provider instanceof Signer
  )
}

const signWavesExchange = async (provider: Provider, message: string) => {
  let publicKey: string
  let signature: string

  try {
    const loginPayload = await provider.login()

    publicKey = loginPayload.publicKey

    signature = await provider.signMessage(message)

    return {
      signature,
      publicKey,
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
        publicKey: string
      }
    | undefined

  if (isWavesExchangeSigner(provider) && provider.currentProvider) {
    signedData = await signWavesExchange(provider.currentProvider, message)
  }

  if (!signedData) {
    throw new Error('unknown signer')
  }

  return {
    ...data,
    ...signedData,
  }
}
