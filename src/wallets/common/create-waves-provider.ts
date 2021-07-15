import { Signer } from '@waves/signer'
import { ProviderWeb } from '@waves.exchange/provider-web'

export const createWavesProvider = (
  walletProvider: unknown = 'https://nodes-testnet.wavesnodes.com'
) => {
  const signer = new Signer({
    // Specify URL of the node on Testnet
    NODE_URL: walletProvider as string
  })
  signer.setProvider(
    new ProviderWeb(
      (walletProvider as string)
        ? 'https://testnet.waves.exchange/signer/'
        : undefined
    )
  )

  return signer
}
