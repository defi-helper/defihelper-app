import { useStore } from 'effector-react'
import clsx from 'clsx'

import { useDialog } from '~/common/dialog'
import { ChangeNetworkDialog } from '~/common/change-network-dialog'
import { useAbility } from '~/users'
import { cutAccount } from '~/common/cut-account'
import { ButtonBase } from '~/common/button-base'
import { Paper } from '~/common/paper'
import { Network, NETWORKS, setupBinance, setupPolygon } from '~/wallets/common'
import { WalletList } from '~/wallets/wallet-list'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as model from './wallet-network-switcher.model'
import * as styles from './wallet-network-switcher.css'
import { Typography } from '~/common/typography'
import { Icon } from '~/common/icon'
import { Button } from '~/common/button'

export type WalletNetworkSwitcherProps = {
  className?: string
  hided?: boolean
}

export const WalletNetworkSwitcher: React.VFC<WalletNetworkSwitcherProps> = (
  props
) => {
  const ability = useAbility()

  const { account = null } = walletNetworkModel.useWalletNetwork()

  const { blockchain, blockchainIcon, title } = useStore(model.$currentNetwork)

  const [openWalletList] = useDialog(WalletList)

  const handleOpenWalletList = async () => {
    try {
      const connector = await openWalletList({ blockchain })

      walletNetworkModel.activateWalletFx({ connector })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

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

    changeNetwork().catch((error) => console.error(error.message))
  }

  return (
    <div
      className={clsx(
        styles.root,
        props.className,
        props.hided && styles.hided
      )}
    >
      {!account ? (
        <Button
          color="green"
          className={styles.connectWallet}
          onClick={handleOpenWalletList}
          size="small"
        >
          {props.hided ? 'C' : 'Connect wallet'}
        </Button>
      ) : (
        <>
          <Typography
            variant="body2"
            family="mono"
            transform="uppercase"
            className={clsx(styles.account, props.hided && styles.accountHided)}
            as="div"
          >
            {blockchainIcon && (
              <Icon
                icon={blockchainIcon}
                className={clsx(
                  styles.networkIcon,
                  props.hided && styles.networkIconHided
                )}
              />
            )}
            {!props.hided && (
              <>
                {cutAccount(account)}
                <Icon icon="arrowTop" className={styles.arrowTop} />
              </>
            )}
          </Typography>
          <Paper className={styles.dropdown} radius={8}>
            <ButtonBase
              onClick={handleOpenWalletList}
              className={clsx(styles.dropdownItem, styles.changeNetwork)}
            >
              Change wallet
            </ButtonBase>
            {NETWORKS.filter((networkItem) =>
              ability.can('read', networkItem.type)
            ).map((networkItem) => (
              <ButtonBase
                key={networkItem.title}
                onClick={handleChangeNetwork(networkItem)}
                className={styles.dropdownItem}
              >
                {networkItem.blockchainIcon && (
                  <Icon
                    icon={networkItem.blockchainIcon}
                    className={styles.networkIcon}
                  />
                )}
                {networkItem.title}
                {title === networkItem.title && (
                  <Icon icon="checked" className={styles.checked} />
                )}
              </ButtonBase>
            ))}
          </Paper>
        </>
      )}
    </div>
  )
}
