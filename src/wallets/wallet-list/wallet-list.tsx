import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { Dialog } from '~/common/dialog'
import { connectorsByName } from '~/wallets/common'
import { networkModel } from '~/wallets/wallet-networks'

export type WalletListProps = {
  onClick: () => void
}

const useStyles = makeStyles({
  icon: {
    width: 40,
    height: 40,
  },
})

export const WalletList: React.VFC<WalletListProps> = (props) => {
  const classes = useStyles()

  const handleActivate = (connector: AbstractConnector) => () => {
    networkModel.activateWalletFx({ connector })
  }

  useEffect(() => {
    networkModel.activateWalletFx.done.watch(props.onClick)
  }, [props.onClick])

  return (
    <Dialog>
      <List>
        {Object.entries(connectorsByName).map(([walletName, wallet]) => (
          <ListItem
            button
            key={walletName}
            onClick={handleActivate(wallet.connector)}
          >
            <ListItemIcon>
              <wallet.logo className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={walletName} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}
