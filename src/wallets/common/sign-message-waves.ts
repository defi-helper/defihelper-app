import type { Provider } from '@waves/signer'
import { Signer } from '@waves/signer'

type WavesKeeper = typeof window.WavesKeeper

const isWavesKeeper = (provider: unknown): provider is WavesKeeper => {
  return (
    provider !== null &&
    provider !== undefined &&
    provider === window.WavesKeeper
  )
}

const isWavesExchangeSigner = (provider: unknown): provider is Signer => {
  return (
    provider !== null && provider !== undefined && provider instanceof Signer
  )
}

const signWavesKeeper = async (provider: WavesKeeper, message: string) => {
  const { signature, publicKey } = await provider.signCustomData({
    version: 2,
    data: [
      {
        type: 'string',
        key: 'name',
        value: message,
      },
    ],
  })

  return {
    signature,
    publicKey,
  }
}

const signWavesExchange = async (provider: Provider, message: string) => {
  let publicKey: string
  let signature: string

  try {
    const loginPayload = await provider.login()

    publicKey = loginPayload.publicKey

    signature = await provider.signMessage(message)
  } catch (error) {
    throw new Error(error)
  }

  return {
    signature,
    publicKey,
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
    network: 'W',
  }

  let signedData:
    | {
        signature: string
        publicKey: string
      }
    | undefined

  if (isWavesKeeper(provider)) {
    signedData = await signWavesKeeper(provider, message)
  }

  if (isWavesExchangeSigner(provider) && provider.currentProvider) {
    signedData = await signWavesExchange(provider.currentProvider, message)
  }

  if (!signedData) {
    throw new Error('something went wrong')
  }

  return {
    ...data,
    ...signedData,
  }
}
