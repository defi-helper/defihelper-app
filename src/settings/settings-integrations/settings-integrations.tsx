import { useStore } from 'effector-react'
import clsx from 'clsx'

import { Typography } from '~/common/typography'
import { SettingsHeader, SettingsPaper } from '~/settings/common'
import { SettingsIntegrationCard } from '~/settings/common/settings-integration-card'
import { useDialog } from '~/common/dialog'
import { SettingsIntegrationBinanceDialog } from '~/settings/common/settings-integration-binance-dialog'
import { Icon } from '~/common/icon'
import { WalletExchangeTypeEnum } from '~/graphql/_generated-types'
import { ConfirmDialog } from '~/common/confirm-dialog'
import * as styles from './settings-integrations.css'
import * as model from './settings-integrations.model'

export type SettingsIntegrationsProps = {
  className?: string
}

const AVAILABLE_INTEGRATIONS = Object.values(WalletExchangeTypeEnum)

const PLACEHOLDERS_COUNT = 3 - AVAILABLE_INTEGRATIONS.length

export const SettingsIntegrations: React.VFC<SettingsIntegrationsProps> = (
  props
) => {
  const integrations = useStore(model.$integrations)
  const loading = useStore(model.fetchEstablishedIntegrationsListFx.pending)
  const [openConnectBinance] = useDialog(SettingsIntegrationBinanceDialog)
  const [openConfirmDialog] = useDialog(ConfirmDialog)

  const handlers = {
    [WalletExchangeTypeEnum.Binance]: {
      dialog: openConnectBinance,
      effect: model.connectIntegrationBinanceFx,
    },
  }

  const handleConnectIntegration =
    (integrationType: WalletExchangeTypeEnum) => async () => {
      try {
        const apiKeyPair = await handlers[integrationType].dialog()

        handlers[integrationType].effect({
          ...apiKeyPair,
          type: integrationType,
        })
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

  const handleDisconnect = (integrationId?: string) => async () => {
    if (!integrationId) return

    try {
      await openConfirmDialog()

      model.disconnectIntegrationFx(integrationId)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const placeholders = Array.from(
    Array(PLACEHOLDERS_COUNT < 0 ? 0 : PLACEHOLDERS_COUNT)
  )

  return (
    <div className={clsx(styles.root, props.className)}>
      <SettingsHeader className={styles.header}>
        <Typography variant="h3">Integrations</Typography>
      </SettingsHeader>
      <div className={styles.list}>
        {AVAILABLE_INTEGRATIONS.map((integrationType) => {
          const integration = integrations[integrationType]

          return (
            <SettingsIntegrationCard
              key={integration?.id ?? integrationType}
              icon={<Icon icon={integrationType} width={28} height={28} />}
              platform={integrationType}
              account={integration?.account}
              onConnect={handleConnectIntegration(integrationType)}
              onDisconnect={handleDisconnect(integration?.id)}
            />
          )
        })}

        {!loading &&
          placeholders.map((_, index) => <SettingsPaper key={String(index)} />)}
      </div>
    </div>
  )
}
