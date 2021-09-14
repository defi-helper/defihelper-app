import { AppLayout } from '~/layouts/app-layout'
import * as styles from './automation-list.css'

export type AutomationListProps = unknown

export const AutomationList: React.VFC<AutomationListProps> = () => {
  return (
    <AppLayout>
      <div className={styles.root}>automationlist</div>
    </AppLayout>
  )
}
