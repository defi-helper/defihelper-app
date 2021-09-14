import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { Dialog } from '~/common/dialog'
import { connectorsByName } from '~/wallets/common'
import * as styles from './wallet-list.css'

export type WalletListProps = {
  onConfirm: (connector: AbstractConnector) => void
  blockchain?: string
}

export const WalletList: React.VFC<WalletListProps> = (props) => {
  const handleActivate = (connector: AbstractConnector) => () =>
    props.onConfirm(connector)

  return (
    <Dialog>
      <List>
        {Object.entries(connectorsByName)
          .filter(
            ([, wallet]) =>
              !props.blockchain || wallet.blockchain === props.blockchain
          )
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
