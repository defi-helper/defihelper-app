import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import { cutAccount } from '~/common/cut-account'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import { AutomationDialog } from '../automation-dialog'
import {
  AutomationSelectList,
  AutomationSelectListItem,
} from '../automation-select-list'
import { Wallet } from '../automation.types'
import * as styles from './automation-wallets-dialog.css'

export type AutomationWalletsDialogProps = {
  onConfirm: (wallet: Wallet) => void
  onCancel: () => void
  wallets: Wallet[]
}

export const AutomationWalletsDialog: React.VFC<AutomationWalletsDialogProps> =
  (props) => {
    const handleOnChange = (wallet: Wallet) => () => {
      props.onConfirm(wallet)
    }

    return (
      <AutomationDialog title="Choose wallet" onBack={props.onCancel}>
        <AutomationSelectList>
          {props.wallets.map((wallet) => (
            <AutomationSelectListItem
              key={wallet.id}
              onClick={handleOnChange(wallet)}
            >
              <div className={styles.walletTitle}>
                <Jazzicon
                  diameter={20}
                  seed={jsNumberForAddress(wallet.address)}
                  paperStyles={{
                    verticalAlign: 'middle',
                    marginRight: 8,
                  }}
                />
                {wallet.name || 'untitled'}
              </div>
              <Typography variant="body3" className={styles.walletSubtitle}>
                {networksConfig[wallet.network]?.title && (
                  <>{networksConfig[wallet.network]?.title}, </>
                )}
                {cutAccount(wallet.address)}
              </Typography>
            </AutomationSelectListItem>
          ))}
        </AutomationSelectList>
      </AutomationDialog>
    )
  }
