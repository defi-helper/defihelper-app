import React from 'react'
import { useDialog } from '~/common/dialog'
import { useAbility } from '../auth.ability'
import { AuthDemoAccessDialog } from './auth-demo-access-dialog'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { toastsService } from '~/toasts'
import { UnsupportedChainError } from '~/wallets/common/unsupported-chain'
import { useWalletList } from '~/wallets/wallet-list'
import { AuthChangeNetworkDialog } from '.'
import * as authModel from '~/auth/auth.model'

export type CanDemoProps = {
  targetArgument?: string
  сlassName?: string
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

  const show = async () => {
    try {
      await openDemoAccessDialog({
        onConfirm: () => authModel.logoutFx(),
      })

      try {
        const wallet = await openWalletList()

        if (!wallet.account) return
        walletNetworkModel.activateWalletFx({
          connector: wallet.connector,
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

  const element = React.cloneElement(props.children, {
    ...props.children.props,
    [props.targetArgument ?? 'onClick']: show,
  })

  return (
    <span
      className={props.сlassName}
      style={{
        opacity: 0.7,
        cursor: 'no-drop',
      }}
    >
      {element}
    </span>
  )
}
