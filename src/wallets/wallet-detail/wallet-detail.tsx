import React from 'react'
import Button from '@material-ui/core/Button'
import { useStore } from 'effector-react'
import { Link } from '@material-ui/core'

import { Dialog } from '~/common/dialog'
import { networkModel } from '~/wallets/wallet-networks'
import { cutAccount } from '~/common/cut-account'
import { buildExplorerUrl } from '~/common/build-explorer-url'

export type WalletDetailProps = {
  onChange: () => void
}

export const WalletDetail: React.VFC<WalletDetailProps> = (props) => {
  const wallet = useStore(networkModel.$wallet)

  return (
    <Dialog>
      {!!wallet.account && !!wallet.chainId && (
        <Link
          href={buildExplorerUrl({
            address: wallet.account,
            network: wallet.chainId
          })}
          target="_blank"
        >
          {cutAccount(wallet.account)}
        </Link>
      )}
      <Button onClick={props.onChange}>Change Wallet</Button>
    </Dialog>
  )
}
