import { useStore } from 'effector-react'
import clsx from 'clsx'
import { ReactComponent as BinanceIcon } from '~/assets/icons/wallets/binance-wallet.svg'

import { Typography } from '~/common/typography'
import {
  SettingsHeader,
  SettingsPaper,
  SettingsWalletLoading,
} from '~/settings/common'
import * as styles from './settings-integrations.css'
import * as model from './settings-integrations.model'
import { SettingsIntegrationCard } from '~/settings/common/settings-integration-card'
import { useDialog } from '~/common/dialog'
import { SettingsIntegrationBinanceDialog } from '~/settings/common/settings-integration-binance-dialog'

export type SettingsWalletsProps = {
  className?: string
}

export const SettingsIntegrations: React.VFC<SettingsWalletsProps> = (
  props
) => {
  const wallets = useStore(model.$wallets)
  const loading = useStore(model.fetchWalletListFx.pending)
  const [openConnectBinance] = useDialog(SettingsIntegrationBinanceDialog)

  const connectWalletHandler = async () => {
    try {
      const apiKeyPair = await openConnectBinance()
      alert(JSON.stringify(apiKeyPair))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={clsx(styles.root, props.className)}>
      <SettingsHeader className={styles.header}>
        <Typography variant="h3">Integrations</Typography>
      </SettingsHeader>
      <div className={styles.list}>
        {loading && <SettingsWalletLoading />}
        {!loading && !wallets.length && (
          <SettingsIntegrationCard
            icon={<BinanceIcon />}
            platform="Binance"
            account="avT55DccZMENH54MIoXesamrkDFp6s9nCRBijkQLj7CPMsq9639N2jJYjEbEg3Fu"
            onConnect={connectWalletHandler}
          />
        )}

        {!loading &&
          Array.from(Array(2)).map((_, index) => (
            <SettingsPaper key={String(index)} />
          ))}
      </div>
    </div>
  )
}
