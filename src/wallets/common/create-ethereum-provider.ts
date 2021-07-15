import { ethers } from 'ethers'

export const createEthereumProvider = (walletProvider: unknown) => {
  if (!walletProvider) return

  return new ethers.providers.Web3Provider(
    walletProvider as ethers.providers.ExternalProvider
  )
}
