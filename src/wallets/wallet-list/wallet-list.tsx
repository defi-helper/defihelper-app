import React, { useEffect } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useStore } from 'effector-react'

import { Dialog } from '~/common/dialog'
import { connectorsByName } from '~/wallets/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as styles from './wallet-list.css'
import { walletNetworkSwitcherModel } from '../wallet-network-switcher'

export type WalletListProps = {
  onClick: () => void
}

export const WalletList: React.VFC<WalletListProps> = (props) => {
  const handleActivate = (connector: AbstractConnector) => () => {
    walletNetworkModel.activateWalletFx({ connector })
  }

  const { blockchain } = useStore(walletNetworkSwitcherModel.$currentNetwork)

  useEffect(() => {
    walletNetworkModel.activateWalletFx.done.watch(props.onClick)
  }, [props.onClick])

  return (
    <Dialog>
      <List>
        {Object.entries(connectorsByName)
          .filter(([, wallet]) => wallet.blockchain === blockchain)
          .map(([walletName, wallet]) => (
            <ListItem
              button
              key={walletName}
              onClick={handleActivate(wallet.connector)}
            >
              <ListItemIcon>
                <wallet.logo className={styles.icon} />
              </ListItemIcon>
              <ListItemText primary={walletName} />
            </ListItem>
          ))}
      </List>
    </Dialog>
  )
}
