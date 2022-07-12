import { useStore } from 'effector-react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { Typography } from '~/common/typography'
import { SettingsHeader } from '~/settings/common'
import { SettingsIntegrationCard } from '~/settings/common/settings-integration-card'
import { useDialog } from '~/common/dialog'
import { Icon } from '~/common/icon'
import { WalletExchangeTypeEnum } from '~/api/_generated-types'
import { ConfirmDialog } from '~/common/confirm-dialog'
import { Loader } from '~/common/loader'
import { Paper } from '~/common/paper'
import { SettingsIntegrationConnect } from '../common/settings-integration-connect'
import * as styles from './settings-integrations.css'
import * as model from './settings-integrations.model'
import { cexTitles } from '../common/constants'
import { analytics } from '~/analytics'

export type SettingsIntegrationsProps = {
  className?: string
}

export const SettingsIntegrations: React.VFC<SettingsIntegrationsProps> = (
  props
) => {
  const integrations = useStore(model.$integrationsList)
  const loading = useStore(model.fetchEstablishedIntegrationsListFx.pending)
  const connectAdding = useStore(model.$connectAdding)

  const [countRender, setCountRender] = useState(0)

  const [openConfirmDialog] = useDialog(ConfirmDialog)

  const handleConnectIntegration =
    (integrationType: WalletExchangeTypeEnum) =>
    async (formValues: Record<string, string>) => {
      try {
        const objectKeys: string[] = []
        const objectValues: string[] = []

        Object.entries(formValues).map(([i, v]) =>
          Promise.all([objectKeys.push(i), objectValues.push(v)])
        )

        await model.connectIntegrationApiExchangeFx({
          objectKeys,
          objectValues,
          type: integrationType,
        })

        setCountRender(countRender + 1)
        analytics.log('settings_cex_connected_success', {
          type: integrationType,
        })
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
          analytics.log('settings_cex_connected_failure', {
            type: integrationType,
          })
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

  useEffect(() => {
    model.fetchEstablishedIntegrationsListFx()
  }, [])

  return (
    <div className={clsx(styles.root, props.className)}>
      {!loading && (
        <>
          <SettingsHeader className={styles.header}>
            <Typography variant="h3">Integrations</Typography>
          </SettingsHeader>
          <div className={styles.list}>
            {integrations.map((integration) => (
              <SettingsIntegrationCard
                key={integration?.id ?? integration.exchange}
                icon={
                  <Icon icon={integration.exchange} width={28} height={28} />
                }
                platform={cexTitles[integration.exchange]}
                account={integration?.account}
                onDisconnect={handleDisconnect(integration?.id)}
                deleting={integration?.deleting}
              />
            ))}
            <SettingsIntegrationConnect
              onConnect={handleConnectIntegration(WalletExchangeTypeEnum.Aax)}
              connecting={Boolean(connectAdding)}
              countRender={countRender}
            />
          </div>
        </>
      )}
      {loading && (
        <Paper radius={8} className={styles.loader}>
          <Loader height="36" />
        </Paper>
      )}
    </div>
  )
}
