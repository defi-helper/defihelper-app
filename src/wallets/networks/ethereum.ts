import { ethers } from 'ethers'

export const createEthereumProvider = (walletProvider: unknown) => {
  return new ethers.providers.Web3Provider(
    walletProvider as ethers.providers.ExternalProvider
  )
}
