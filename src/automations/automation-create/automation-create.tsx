import { useStore } from 'effector-react'

import { AppLayout } from '~/layouts/app-layout'
import { AutomationTriggerForm } from '~/automations/common/automation-trigger-form'
import { userModel } from '~/users'
import * as styles from './automation-create.css'
import * as model from './automation-create.model'

export type AutomationCreateProps = unknown

export const AutomationCreate: React.VFC<AutomationCreateProps> = () => {
  const wallets = useStore(userModel.$userWallets)
  const loading = useStore(model.createTriggerFx.pending)

  return (
    <AppLayout>
      <div className={styles.root}>
        <AutomationTriggerForm
          wallets={wallets}
          onSubmit={model.createTriggerFx}
          loading={loading}
        />
      </div>
    </AppLayout>
  )
}
