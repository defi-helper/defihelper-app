import { AbstractConnector } from '@web3-react/abstract-connector'

import { ButtonBase } from '~/common/button-base'
import { Dialog, useDialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import { augmentConnectorUpdate, connectorsByName } from '~/wallets/common'
import * as styles from './wallet-list.css'

export type WalletListPayload = {
  connector: AbstractConnector
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provider: any
  chainId: string | number
  account: string | null
  blockchain: string
}

export type WalletListProps = {
  onConfirm: (data: WalletListPayload) => void
  onCancel: (value: unknown) => void
  blockchain?: string
}

export const WalletList: React.VFC<WalletListProps> = (props) => {
  const handleActivate =
    (connector: AbstractConnector, blockchain: string) => async () => {
      try {
        const data = await augmentConnectorUpdate(
          connector,
          await connector.activate()
        )

        props.onConfirm({ ...data, blockchain })
      } catch (error) {
        props.onCancel(error)
      }
    }

  return (
    <Dialog className={styles.root}>
      <ul className={styles.list}>
        {Object.entries(connectorsByName)
          .filter(
            ([, wallet]) =>
              !props.blockchain || wallet.blockchain === props.blockchain
          )
          .map(([walletName, wallet]) => (
            <li key={walletName}>
              <ButtonBase
                onClick={handleActivate(wallet.connector, wallet.blockchain)}
                className={styles.wallet}
              >
                <wallet.logo className={styles.icon} />
                <Typography as="span">{walletName}</Typography>
              </ButtonBase>
            </li>
          ))}
      </ul>
    </Dialog>
  )
}

export const useWalletList = () => useDialog(WalletList)
