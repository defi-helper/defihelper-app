import clsx from 'clsx'

import { Typography } from '~/common/typography'
import { Button } from '~/common/button'
import { SettingsHeader, SettingsWalletCard } from '~/settings/common'
import * as styles from './settings-wallets.css'

export type SettingsWalletsProps = {
  className?: string
}

export const SettingsWallets: React.VFC<SettingsWalletsProps> = (props) => {
  return (
    <div className={clsx(styles.root, props.className)}>
      <SettingsHeader className={styles.header}>
        <Typography variant="h3">Wallets and Funds</Typography>
        <Button color="blue">+ Add Wallet</Button>
      </SettingsHeader>
      <div className={styles.list}>
        <SettingsWalletCard
          title="test"
          address="0x9403932015576D13Fb26B135ed7a35d5d95C18d4"
          network="1"
          blockchain="ethereum"
          automations="12"
          onDeposit={() => {}}
          onRefund={() => {}}
          onRename={() => {}}
          onDelete={() => {}}
          feeFunds="24.72 ETH"
          locked="24.72 ETH"
        />
        <SettingsWalletCard
          title="test"
          address="0x9403932015576D13Fb26B135ed7a35d5d95C18d4"
          network="1"
          blockchain="ethereum"
          automations="12"
          onDeposit={() => {}}
          onRefund={() => {}}
          onRename={() => {}}
          onDelete={() => {}}
          error
          feeFunds="24.72 ETH"
          locked="24.72 ETH"
        />
      </div>
    </div>
  )
}
