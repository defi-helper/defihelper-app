import React from 'react'
import Button from '@material-ui/core/Button'
import { useStore } from 'effector-react'

import { Dialog } from '~/common/dialog'
import { $wallet } from '~/wallets/networks/network.model'
import { cutAccount } from '~/common/cut-account'

export type WalletDetailProps = {
  onChange: () => void
}

export const WalletDetail: React.VFC<WalletDetailProps> = (props) => {
  const wallet = useStore($wallet)

  return (
    <Dialog>
      <div>{cutAccount(wallet.account)}</div>
      <Button onClick={props.onChange}>Change Wallet</Button>
    </Dialog>
  )
}
