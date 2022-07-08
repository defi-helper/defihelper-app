import React, { MouseEventHandler } from 'react'
import { useDialog } from '~/common/dialog'
import { useAbility } from './auth.ability'
import { AuthDemoAccessDialog } from './common/auth-demo-access-dialog'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { toastsService } from '~/toasts'
import { UnsupportedChainError } from '~/wallets/common/unsupported-chain'
import { useWalletList } from '~/wallets/wallet-list'
import { AuthChangeNetworkDialog } from './common'
import * as authModel from '~/auth/auth.model'

export type CanDemoProps = {
  targetArgument?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const CanDemo: React.FC<CanDemoProps> = (props) => {
  const ability = useAbility()
  const [openDemoAccessDialog] = useDialog(AuthDemoAccessDialog)
  const [openWalletList] = useWalletList()
  const [openChangeNetworkDialog] = useDialog(AuthChangeNetworkDialog)

  if (!React.isValidElement(props.children)) {
    throw new Error('invalid element')
  }

  if (ability.can('read', 'NonDemo')) {
    return props.children
  }

  const show = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (props.onClick) {
      props.onClick(e)
    }

    try {
      await openDemoAccessDialog()
      await authModel.logoutFx()

      try {
        const wallet = await openWalletList()

        if (!wallet.account) return

        walletNetworkModel.signMessage({
          connector: wallet.connector,
          chainId: wallet.chainId,
          provider: wallet.provider,
          blockchain: wallet.blockchain,
          account: wallet.account,
        })
      } catch (error) {
        if (error instanceof UnsupportedChainError) {
          openChangeNetworkDialog().catch((err) => console.error(err.message))

          return
        }

        if (error instanceof Error) {
          toastsService.error(error.message)
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return React.cloneElement(props.children, {
    ...props.children.props,
    [props.targetArgument ?? 'onClick']: show,
  })
}
