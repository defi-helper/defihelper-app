import { useState } from 'react'
import { useStore } from 'effector-react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { useDialog } from '~/common/dialog'
import { ChangeNetworkDialog } from '~/common/change-network-dialog'
import { useAbility } from '~/users'
import { Network, NETWORKS, setupBinance, setupPolygon } from '~/wallets/common'
import * as model from './wallet-network-switcher.model'
import { Button } from '~/common/button'
import * as styles from './wallet-network-switcher.css'

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
      activateEthereum: async () => model.activateEthereum(openChangeNetwork),
      activateBinance: async () => model.activateEthereum(setupBinance),
      activatePolygon: async () => model.activateEthereum(setupPolygon),
      activateWaves: async () => model.activateWaves(),
    }

    const handleChangeNetwork = (networkItem: Network) => () => {
      const changeNetwork = handlers[networkItem.onClick ?? '']

      if (!changeNetwork) return model.activateNetwork(networkItem)

      changeNetwork()
        .then(handleClose)
        .catch((error) => console.error(error.message))
    }

    return (
      <>
        <Button onClick={handleClick} color="secondary">
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
              className={styles.dropdownItem}
            >
              {networkItem.title}
            </MenuItem>
          ))}
        </Menu>
      </>
    )
  }
