import { ethers } from 'ethers'

const isEthers = (
  provider: unknown
): provider is ethers.providers.Web3Provider => {
  return (
    provider !== null &&
    provider !== undefined &&
    provider instanceof ethers.providers.Web3Provider
  )
}

export const signMessageEthereum = async (
  provider: unknown,
  address: string,
  message: string
) => {
  if (isEthers(provider)) {
    const signature = await provider.getSigner().signMessage(message)

    return {
      signature,
      message,
      address,
    }
  }

  throw new Error('something went wrong')
}
