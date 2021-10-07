import { Paper } from '~/common/paper'
import * as styles from './settings-initial-card.css'

export type SettingsInitialCardProps = unknown

export const SettingsInitialCard: React.FC<SettingsInitialCardProps> = (
  props
) => {
  return (
    <Paper radius={8} className={styles.root}>
      {props.children}
    </Paper>
  )
}
