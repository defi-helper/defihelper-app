import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useState } from 'react'
import { useStore } from 'effector-react'

import { useDialog } from '~/common/dialog'
import { ChangeNetworkDialog } from '~/common/change-network-dialog'
import { setupBinance } from '~/common/setup-network'
import { useAbility } from '~/users'
import { Network, NETWORKS, connectors } from '~/wallets/common'
import * as model from './wallet-network-switcher.model'

export type WalletNetworkSwitcherProps = {
  className?: string
}

export const WalletNetworkSwitcher: React.VFC<WalletNetworkSwitcherProps> =
  () => {
    const ability = useAbility()

    const currentNetwork = useStore(model.$currentNetwork)

    const [anchorEl, setAnchorEl] = useState<
      (EventTarget & HTMLButtonElement) | null
    >(null)

    const handleClose = () => setAnchorEl(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
      setAnchorEl(event.currentTarget)

    const [openChangeNetwork] = useDialog(ChangeNetworkDialog)

    const handlers: Record<string, () => Promise<unknown>> = {
      openChangeNetwork,
      setupBinance,
      loginWaves: connectors.wavesKepper.activate
    }

    const handleChangeNetwork = (networkItem: Network) => () => {
      const changeNetwork = handlers[networkItem.onClick ?? '']

      if (!changeNetwork) {
        model.activateNetwork(networkItem)

        handleClose()

        return
      }

      changeNetwork()
        .then(() => {
          model.activateNetwork(networkItem)
          handleClose()
        })
        .catch((error) => console.error(error.message))
    }

    return (
      <>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          {currentNetwork.title}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {NETWORKS.filter((networkItem) =>
            ability.can('read', networkItem.type)
          ).map((networkItem) => (
            <MenuItem
              key={networkItem.title}
              button
              onClick={handleChangeNetwork(networkItem)}
            >
              {networkItem.title}
            </MenuItem>
          ))}
        </Menu>
      </>
    )
  }
