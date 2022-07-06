/* eslint-disable no-console */
import { useState, useEffect } from 'react'
import { useStore } from 'effector-react'
import { ConnectorEvent, ConnectorUpdate } from '@web3-react/types'

import { connectors, connectorsByName } from '~/wallets/common'
import {
  $wallet,
  activateWalletFx,
  diactivateWalletFx,
  updateWalletFx,
} from './wallet-network.model'

const isAuthorizable = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lastConnector: any
): lastConnector is { isAuthorized: () => Promise<boolean> } => {
  return (
    typeof lastConnector === 'object' &&
    lastConnector !== null &&
    lastConnector.isAuthorized !== undefined
  )
}

export const useEagerConnect = () => {
  const wallet = useStore($wallet)

  const [tried, setTried] = useState(false)

  useEffect(() => {
    const lastConnectorName: string = localStorage.connector

    const lastConnector =
      connectorsByName[lastConnectorName]?.connector ?? connectors.injected

    if (localStorage.demo) return

    if (isAuthorizable(lastConnector)) {
      lastConnector.isAuthorized().then((isAuthorized: boolean) => {
        if (isAuthorized) {
          activateWalletFx({
            connector: lastConnector,
          }).catch(() => {
            setTried(true)
          })
        } else {
          setTried(true)
        }
      })
    } else {
      activateWalletFx({ connector: lastConnector }).catch(() => {
        setTried(true)
      })
    }
  }, [])

  useEffect(() => {
    if (!tried && wallet?.connector) {
      setTried(true)
    }
  }, [tried, wallet?.connector])

  return tried
}

export const useInactiveListener = (suppress = false) => {
  const wallet = useStore($wallet)

  useEffect(() => {
    const { ethereum } = window

    if (ethereum?.on && !wallet?.connector && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event")
        activateWalletFx({ connector: connectors.injected })
      }

      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId)

        if (!wallet) return

        updateWalletFx({ connector: connectors.injected, update: wallet })
      }

      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts)

        if (!accounts.length || !wallet) return

        updateWalletFx({ connector: connectors.injected, update: wallet })
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (!ethereum.removeListener) return

        ethereum.removeListener('connect', handleConnect)
        ethereum.removeListener('chainChanged', handleChainChanged)
        ethereum.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [wallet, suppress])
}

export const useEthereumNetwork = () => {
  const wallet = useStore($wallet)

  const suppress = useEagerConnect()

  useInactiveListener(suppress)

  useEffect(() => {
    const handleUpdate = (update: ConnectorUpdate<string>) => {
      if (!wallet?.connector) return

      updateWalletFx({ connector: wallet.connector, update })
    }

    const handleError = (error: Error) => {
      console.error(error.message)
    }

    const handleDeactivate = () => {
      diactivateWalletFx(wallet?.connector)
    }

    if (wallet?.connector) {
      wallet.connector
        .on(ConnectorEvent.Update, handleUpdate)
        .on(ConnectorEvent.Error, handleError)
        .on(ConnectorEvent.Deactivate, handleDeactivate)
    }

    return () => {
      if (wallet?.connector) {
        wallet.connector
          .off(ConnectorEvent.Update, handleUpdate)
          .off(ConnectorEvent.Error, handleError)
          .off(ConnectorEvent.Deactivate, handleDeactivate)
      }
    }
  }, [wallet?.connector])
}
