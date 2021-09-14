import { AppLayout } from '~/layouts/app-layout'
import * as styles from './automation-create.css'

export type AutomationCreateProps = unknown

export const AutomationCreate: React.VFC<AutomationCreateProps> = () => {
  return (
    <AppLayout>
      <div className={styles.root}>automationCreate</div>
    </AppLayout>
  )
}
