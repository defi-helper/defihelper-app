import { useParams } from 'react-router-dom'

import { AppLayout } from '~/layouts/app-layout'
import * as styles from './automation-update.css'

export type AutomationUpdateProps = unknown

export const AutomationUpdate: React.VFC<AutomationUpdateProps> = () => {
  const params = useParams<{ automationId: string }>()

  return (
    <AppLayout>
      <div className={styles.root}>AutomationUpdate: {params.automationId}</div>
    </AppLayout>
  )
}
