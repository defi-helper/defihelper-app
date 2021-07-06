/// <reference types="react-scripts" />

type EthereumEventMap = {
  connect: unknown
  chainChanged: string | number
  accountsChanged: string[]
  networkChanged: string | number
}

interface Window {
  ethereum?: {
    isMetaMask?: true
    isTrust?: true
    on?: <K extends keyof EthereumEventMap>(
      type: K,
      listener: (ev: EthereumEventMap[K]) => void
    ) => void
    removeListener?: <K extends keyof EthereumEventMap>(
      type: K,
      listener: (ev: EthereumEventMap[K]) => void
    ) => void
    request?: (arg: Record<string, unknown>) => Promise<void>
  }
  dataLayer?: string[]
  ym?: (id: number, type: string, event: string) => void
  axios: unknown
}
